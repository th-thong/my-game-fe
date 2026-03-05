import { Button } from "@/components/ui/button";

interface BannerButtonProps {
  imageSrc: string;
  altText?: string;
}

export function BannerButton({ imageSrc, altText = "" }: BannerButtonProps) {
  return (
    <Button className="p-0 w-auto h-auto rounded-none border-2 border-white-500">
      <img src={imageSrc} alt={altText} />
    </Button>
  );
}
