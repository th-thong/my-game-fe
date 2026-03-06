import { useMemo } from "react";

interface GachaCacheItem {
  id: string;
  name: string;
  roundIcon: string;
}

interface AvatarWithCountProps {
  name: string;
  count: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarWithCount({
  name,
  count,
  size = "md",
}: AvatarWithCountProps) {
  const imageSrc = useMemo(() => {
    try {
      const charData = localStorage.getItem("wuwa_characters_cache");
      if (charData) {
        const characters: GachaCacheItem[] = JSON.parse(charData);
        const char = characters.find((c) => c.name === name);
        if (char?.roundIcon) return char.roundIcon;
      }

      const weaponData = localStorage.getItem("wuwa_weapons_cache");
      if (weaponData) {
        const weapons: GachaCacheItem[] = JSON.parse(weaponData);
        const weapon = weapons.find((w) => w.name === name);
        if (weapon?.roundIcon) return weapon.roundIcon;
      }
    } catch (error) {
      console.error("Failed to parse gacha cache", error);
    }
    return "";
  }, [name]);

  const badgeColorClass = useMemo(() => {
    if (count >= 70) return "bg-red-600";
    if (count >= 50) return "bg-amber-500";
    return "bg-emerald-600";
  }, [count]);

  const sizeClasses = { sm: "w-10 h-10", md: "w-16 h-16", lg: "w-24 h-24" };
  const badgeSize = {
    sm: "h-4 min-w-[16px] text-[10px]",
    md: "h-7 min-w-[28px] text-sm",
    lg: "h-9 min-w-[36px] text-base",
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} shrink-0`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full rounded-full object-fill border-none"
        />
      ) : (
        <div className="w-full h-full rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 overflow-hidden">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        className={`absolute -bottom-1 -right-1 flex items-center justify-center text-white font-bold rounded-full border-4 border-zinc-950 px-1 ${badgeColorClass} ${badgeSize[size]} shadow-lg transition-colors duration-300`}
      >
        {count}
      </div>
    </div>
  );
}
