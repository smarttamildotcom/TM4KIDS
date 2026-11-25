"use client";

import Image from "next/image";
import questyImage from "@/Questy Image.png";

/** Hero illustration: Questy the detective cat mascot. */
export function QuestyHeroIllustration() {
  return (
    <div className="relative mx-auto flex w-full max-w-[28rem] justify-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-[85%] w-[85%] translate-y-4 rounded-[45%] bg-detective-blue-100"
      />

      <div className="relative flex h-[340px] w-full items-center justify-center sm:h-[420px] lg:h-[500px]"
      >
        <Image
          src={questyImage}
          alt="Questy, the IP2Kids detective mascot"
          priority
          className="mx-auto block h-full w-auto max-w-full object-contain object-center drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
