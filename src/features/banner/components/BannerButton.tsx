import { memo } from "react";
import { Button } from "@/components/ui/button";

export type BadgeType = "event" | "starter" | "discount" | "none";

interface BannerButtonProps {
  id: number;
  imageSrc: string;
  altText?: string;
  badgeText?: string;
  badgeType?: BadgeType;
  isActive: boolean;
  onClick: (id: number) => void;
}

const badgeStyles: Record<BadgeType, string> = {
  event: "bg-[#f5b041] text-zinc-950",
  starter: "bg-[#3498db] text-zinc-950",
  discount: "bg-[#2ecc71] text-zinc-950",
  none: "hidden",
};

const BannerButtonComponent = ({
  id,
  imageSrc,
  altText = "Banner",
  badgeText,
  badgeType = "none",
  isActive,
  onClick,
}: BannerButtonProps) => {
  return (
    <Button
      onClick={() => onClick(id)}
      className={`relative p-0 w-full h-auto rounded-none border-2 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 overflow-hidden transition-all duration-200 lg:origin-left origin-center ${
        isActive
          ? "scale-105 lg:scale-110 z-10 opacity-100 border-white"
          : "scale-100 opacity-70 hover:opacity-100 border-white"
      }`}
    >
      <img
        src={imageSrc}
        alt={altText}
        decoding="async"
        className="w-full h-full object-cover"
      />
      {badgeType !== "none" && badgeText && (
        <div
          className={`absolute top-0 left-0 px-2 py-1 text-[8px] md:text-xs font-bold uppercase rounded-br-lg shadow-sm ${badgeStyles[badgeType]}`}
        >
          {badgeText}
        </div>
      )}
    </Button>
  );
};

export const BannerButton = memo(BannerButtonComponent);
