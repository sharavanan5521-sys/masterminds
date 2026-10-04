import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Horizontal lockup built from the original logo artwork (mark + wordmark + tagline).
export function Logo({ variant = "color", className }: { variant?: "color" | "white"; className?: string }) {
  const white = variant === "white";
  return (
    <Link href="/" aria-label="Masterminds — home" className={cn("flex items-center gap-2.5", className)}>
      <Image src="/brand/mark.png" alt="" width={738} height={763} priority className="h-11 w-auto" />
      <span className="flex flex-col gap-1">
        <Image
          src={white ? "/brand/wordmark-white.png" : "/brand/wordmark.png"}
          alt="Masterminds"
          width={1251}
          height={146}
          priority
          className="h-[17px] w-auto"
        />
        <Image
          src={white ? "/brand/tagline-white.png" : "/brand/tagline.png"}
          alt=""
          width={778}
          height={144}
          priority
          className="h-[13px] w-auto opacity-90"
        />
      </span>
    </Link>
  );
}
