interface AvatarWithCountProps {
  imageSrc: string;
  count: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarWithCount({
  imageSrc,
  count,
  size = "md",
}: AvatarWithCountProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const badgeSize = {
    sm: "h-4 min-w-[16px] text-[10px]",
    md: "h-7 min-w-[28px] text-sm",
    lg: "h-9 min-w-[36px] text-base",
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} shrink-0`}>
      <img
        src={imageSrc}
        alt="Item"
        className="w-full h-full rounded-full object-cover border border-zinc-700 bg-zinc-800"
      />

      <div
        className={`
          absolute -bottom-1 -right-1
          flex items-center justify-center
          bg-emerald-600 text-white font-bold
          rounded-full
          border-4 border-zinc-950
          px-1
          ${badgeSize[size]}
          shadow-sm
        `}
      >
        {count}
      </div>
    </div>
  );
}
