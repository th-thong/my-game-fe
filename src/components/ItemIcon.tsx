import config from "@/config";
import { memo } from "react";

interface ItemIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  iconSrc?: string;
}

function ItemIconComponent({ name, size = "md", iconSrc }: ItemIconProps) {
  const activeImageSrc = iconSrc;

  const sizeClasses = {
    sm: "w-8 h-8 md:w-10 md:h-10",
    md: "w-12 h-12 md:w-16 md:h-16",
    lg: "w-16 h-16 md:w-24 md:h-24",
  };

  const baseUrl = config.imageUrl;
  const finalImageSrc = activeImageSrc ? baseUrl + activeImageSrc : "";

  return (
    <div className={`relative inline-block ${sizeClasses[size]} shrink-0`}>
      {finalImageSrc ? (
        <img
          src={finalImageSrc}
          alt={name}
          decoding="async"
          className="w-full h-full rounded-full object-cover object-top border-none"
        />
      ) : (
        <div className="w-full h-full rounded-full border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 overflow-hidden bg-zinc-900">
          {name ? name.slice(0, 2).toUpperCase() : "??"}
        </div>
      )}
    </div>
  );
}

export const ItemIcon = memo(ItemIconComponent);
