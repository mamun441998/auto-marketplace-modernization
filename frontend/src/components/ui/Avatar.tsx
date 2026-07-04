import Image from "next/image";
import clsx from "clsx";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  src?: string;
  alt: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
};

export default function Avatar({
  src,
  alt,
  initials,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClasses: Record<AvatarSize, string> = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={clsx(
        "relative flex items-center justify-center overflow-hidden rounded-full bg-slate-200",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="80px"
          className="object-cover"
        />
      ) : (
        <span className="select-none font-semibold text-slate-600">
          {initials ?? alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
