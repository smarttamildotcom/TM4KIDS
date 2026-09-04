"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";

/**
 * PayNow contribution option. Displays the QR image when one is available and
 * falls back to a placeholder automatically until it is added.
 *
 * To go live, drop the QR image at `public/paynow-qr.png` (or pass a different
 * `qrSrc`). No code changes are needed — the placeholder disappears on its own.
 */
export function PayNowCard({ qrSrc = "/paynow-qr.png" }: { qrSrc?: string }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <article className="flex h-full flex-col rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-detective-blue-500 text-white shadow-md">
          <QrCode className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-bold text-detective-blue-900 sm:text-2xl">
          PayNow
        </h3>
      </div>

      <div className="mt-6 grid aspect-square w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-detective-blue-200 bg-detective-blue-50/60">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- swappable placeholder image, existence checked at runtime.
          <img
            src={qrSrc}
            alt="Brand Quest PayNow QR code"
            onError={() => setHasImage(false)}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="px-6 text-center">
            <QrCode
              className="mx-auto h-16 w-16 text-detective-blue-300"
              aria-hidden="true"
            />
            <p className="mt-4 font-display text-lg font-bold uppercase tracking-widest text-detective-blue-700">
              PayNow QR
            </p>
            <p className="mt-2 text-sm font-semibold text-detective-blue-500">
              QR will be added later
            </p>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-detective-blue-700/85">
        Scan using any Singapore banking app.
      </p>
    </article>
  );
}
