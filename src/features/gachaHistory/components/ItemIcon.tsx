import { useMemo } from "react";

interface CharacterCacheItem {
  ID: number;
  Name: string;
  RoleHeadIcon: string;
}

interface WeaponCacheItem {
  ID: number;
  Name: string;
  Icon: string;
}

interface AvatarWithCountProps {
  resourceId?: number;
  name: string;
  count: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarWithCount({
  resourceId,
  name,
  count,
  size = "md",
}: AvatarWithCountProps) {
  const imageSrc = useMemo(() => {
    if (!resourceId && !name) return "";

    try {
      const charData = localStorage.getItem("wuwa_characters_cache");
      if (charData) {
        const characters: CharacterCacheItem[] = JSON.parse(charData);

        let char = characters.find((c) => Number(c.ID) === Number(resourceId));

        if (!char && name) {
          char = characters.find((c) => c.Name === name);
        }

        if (char?.RoleHeadIcon) return char.RoleHeadIcon;
      }

      const weaponData = localStorage.getItem("wuwa_weapons_cache");
      if (weaponData) {
        const weapons: WeaponCacheItem[] = JSON.parse(weaponData);

        let weapon = weapons.find((w) => Number(w.ID) === Number(resourceId));

        if (!weapon && name) {
          weapon = weapons.find((w) => w.Name === name);
        }

        if (weapon?.Icon) return weapon.Icon;
      }
    } catch (error) {
      console.error("Failed to parse gacha cache", error);
    }

    return "";
  }, [resourceId, name]);

  const badgeColorClass = useMemo(() => {
    if (count >= 70) return "bg-red-600";
    if (count >= 50) return "bg-amber-500";
    return "bg-emerald-600";
  }, [count]);

  const sizeClasses = {
    sm: "w-8 h-8 md:w-10 md:h-10",
    md: "w-12 h-12 md:w-16 md:h-16",
    lg: "w-16 h-16 md:w-24 md:h-24",
  };

  const badgeSize = {
    sm: "h-3 min-w-[12px] text-[8px] md:h-4 md:min-w-[16px] md:text-[10px]",
    md: "h-5 min-w-[20px] text-[10px] md:h-7 md:min-w-[28px] md:text-sm",
    lg: "h-7 min-w-[28px] text-sm md:h-9 md:min-w-[36px] md:text-base",
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
          {name ? name.slice(0, 2).toUpperCase() : "??"}
        </div>
      )}
      <div
        className={`absolute -bottom-1 -right-1 flex items-center justify-center text-white font-bold rounded-full border-[3px] border-background px-1.5 ${badgeColorClass} ${badgeSize[size]} shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors duration-300`}
      >
        {count}
      </div>
    </div>
  );
}
