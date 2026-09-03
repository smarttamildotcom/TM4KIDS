"""
One-off asset fix: the uploaded Detective Questy artwork was exported without an
alpha channel, so its editor checkerboard is baked into the pixels. This keys the
background out by flood-filling inward from the borders and rewrites the file as
a transparent RGBA PNG. Run with: python3 scripts/make-transparent.py
"""

import struct
import sys
import zlib
from collections import deque


def load_png(path):
    data = open(path, "rb").read()
    pos, idat = 8, b""
    width = height = channels = None

    while pos < len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        chunk_type = data[pos + 4 : pos + 8]
        chunk = data[pos + 8 : pos + 8 + length]
        if chunk_type == b"IHDR":
            width, height, _bit_depth, color_type = struct.unpack(">IIBB", chunk[:10])
            channels = 4 if color_type == 6 else 3
        elif chunk_type == b"IDAT":
            idat += chunk
        pos += 12 + length

    raw = zlib.decompress(idat)
    stride = width * channels
    rows, prev, i = [], bytearray(stride), 0

    for _ in range(height):
        filter_type = raw[i]
        i += 1
        line = bytearray(raw[i : i + stride])
        i += stride
        for x in range(stride):
            a = line[x - channels] if x >= channels else 0
            b = prev[x]
            c = prev[x - channels] if x >= channels else 0
            if filter_type == 1:
                line[x] = (line[x] + a) & 255
            elif filter_type == 2:
                line[x] = (line[x] + b) & 255
            elif filter_type == 3:
                line[x] = (line[x] + (a + b) // 2) & 255
            elif filter_type == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[x] = (line[x] + pr) & 255
        rows.append(bytearray(line))
        prev = line

    return width, height, channels, rows


def write_rgba(path, width, height, pixels):
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        raw += pixels[y]

    def chunk(tag, payload):
        return (
            struct.pack(">I", len(payload))
            + tag
            + payload
            + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
        )

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    open(path, "wb").write(png)


def make_transparent(path, threshold=232, spread=12):
    width, height, channels, rows = load_png(path)

    def is_background(x, y):
        off = x * channels
        r, g, b = rows[y][off], rows[y][off + 1], rows[y][off + 2]
        return min(r, g, b) >= threshold and (max(r, g, b) - min(r, g, b)) <= spread

    # Flood fill inward from the borders so light pixels inside the artwork survive.
    transparent = bytearray(width * height)
    queue = deque()

    for x in range(width):
        for y in (0, height - 1):
            if not transparent[y * width + x] and is_background(x, y):
                transparent[y * width + x] = 1
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if not transparent[y * width + x] and is_background(x, y):
                transparent[y * width + x] = 1
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                idx = ny * width + nx
                if not transparent[idx] and is_background(nx, ny):
                    transparent[idx] = 1
                    queue.append((nx, ny))

    out = []
    cleared = 0
    for y in range(height):
        line = bytearray(width * 4)
        for x in range(width):
            src = x * channels
            dst = x * 4
            line[dst] = rows[y][src]
            line[dst + 1] = rows[y][src + 1]
            line[dst + 2] = rows[y][src + 2]
            if transparent[y * width + x]:
                line[dst + 3] = 0
                cleared += 1
            else:
                line[dst + 3] = rows[y][src + 3] if channels == 4 else 255
        out.append(line)

    # Second pass: pockets of checkerboard fully enclosed by artwork are never
    # reached by the border fill, so clear anything showing both checker tones.
    def checker_tone(x, y):
        off = x * 4
        r, g, b = out[y][off], out[y][off + 1], out[y][off + 2]
        if (max(r, g, b) - min(r, g, b)) > spread:
            return None
        if threshold <= max(r, g, b) <= 249:
            return "dark"
        if max(r, g, b) >= 250:
            return "light"
        return None

    window = 10
    for y in range(height):
        for x in range(width):
            if out[y][x * 4 + 3] == 0 or checker_tone(x, y) is None:
                continue
            tones = set()
            for wy in range(max(0, y - window), min(height, y + window + 1), 2):
                for wx in range(max(0, x - window), min(width, x + window + 1), 2):
                    tone = checker_tone(wx, wy)
                    if tone:
                        tones.add(tone)
                    if len(tones) == 2:
                        break
                if len(tones) == 2:
                    break
            if len(tones) == 2:
                out[y][x * 4 + 3] = 0
                cleared += 1

    write_rgba(path, width, height, out)
    pct = 100 * cleared / (width * height)
    print(f"{path}: cleared {pct:.1f}% of pixels to transparent")


if __name__ == "__main__":
    for target in sys.argv[1:]:
        make_transparent(target)
