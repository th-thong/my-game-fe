import { Button } from "@/components/ui/button";


type BadgeType = "event" | "starter" | "discount" | "none";

interface BannerButtonProps {
  imageSrc: string;
  altText?: string;
  badgeText?: string;
  badgeType?: BadgeType;
}

const badgeStyles: Record<BadgeType, string> = {
  event: "bg-[#f5b041] text-zinc-950",
  starter: "bg-[#3498db] text-zinc-950",
  discount: "bg-[#2ecc71] text-zinc-950",
  none: "hidden",
};

export function BannerButton({
  imageSrc,
  altText = "",
  badgeText,
  badgeType = "none",
}: BannerButtonProps) {
  return (
    <Button className="relative p-0 w-auto h-auto rounded-none border-2 border-white overflow-hidden group hover:opacity-90 transition-opacity">
      <img
        src={imageSrc}
        alt={altText}
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
}
