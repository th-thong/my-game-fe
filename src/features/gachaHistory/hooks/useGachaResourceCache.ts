import { useMemo } from "react";

import { useCharacterStore } from "@/store/useCharacterStore";
import { useWeaponStore } from "@/store/useWeaponStore";

export function useGachaResourceImage(
  resourceId?: number,
  name?: string,
): string {
  const characters = useCharacterStore((state) => state.characters);
  const weapons = useWeaponStore((state) => state.weapons);

  return useMemo(() => {
    if (!resourceId && !name) return "";

    let char = characters.find((c) => c.Id === resourceId);
    if (!char && name) {
      char = characters.find((c) => c.Name === name);
    }
    if (char?.RoleHeadIcon) {
      return char.RoleHeadIcon;
    }

    let weapon = weapons.find((w) => w.Id === resourceId);
    if (!weapon && name) {
      weapon = weapons.find((w) => w.Name === name);
    }
    if (weapon?.Icon) {
      return weapon.Icon;
    }

    return "";
  }, [resourceId, name, characters, weapons]);
}
