import config from "@/config";
import { useMemo, memo } from "react";
import { useGachaResourceImage } from "../hooks/useGachaResourceCache";

interface AvatarWithCountProps {
  resourceId?: number;
  name: string;
  count: number;
  size?: "sm" | "md" | "lg";
  iconSrc?: string;
}

function AvatarWithCountComponent({
  resourceId,
  name,
  count,
  size = "md",
  iconSrc,
}: AvatarWithCountProps) {
  const cachedImageSrc = useGachaResourceImage(resourceId, name);

  const activeImageSrc = iconSrc || cachedImageSrc;

  const badgeColorClass = useMemo(() => {
    if (count >= 70) return "bg-red-600";
    if (count >= 50) return "bg-[#f77f00]";
    return "bg-emerald-600";
  }, [count]);

  const sizeClasses = {
    sm: "w-8 h-8 md:w-10 md:h-10",
    md: "w-12 h-12 md:w-16 md:h-16",
    lg: "w-16 h-16 md:w-24 md:h-24",
  };

  const badgeSize = {
    sm: "h-3 w-3 text-[8px] md:h-4 md:w-4 md:text-[10px]",
    md: "h-5 w-5 text-[10px] md:h-7 md:w-7 md:text-sm",
    lg: "h-7 w-7 text-sm md:h-9 md:w-9 md:text-base",
  };

  const baseUrl = config.imageUrl;

  const finalImageSrc = activeImageSrc ? baseUrl + activeImageSrc : "";

  return (
    <div className={`relative inline-block ${sizeClasses[size]} shrink-0`}>
      {activeImageSrc ? (
        <img
          src={finalImageSrc}
          alt={name}
          decoding="async"
          className="w-full h-full rounded-full object-fill border-none"
        />
      ) : (
        <div className="w-full h-full rounded-full border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 overflow-hidden bg-zinc-900">
          {name ? name.slice(0, 2).toUpperCase() : "??"}
        </div>
      )}
      <div
        className={`absolute -bottom-1 -right-1 flex items-center justify-center text-white font-bold leading-none rounded-full border-2 border-zinc-950 ${badgeColorClass} ${badgeSize[size]} shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors duration-300`}
      >
        {count}
      </div>
    </div>
  );
}

export const AvatarWithCount = memo(AvatarWithCountComponent);
