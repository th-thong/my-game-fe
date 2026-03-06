import { useMemo } from "react";
import { useUpdateGacha } from "./useUpdateGacha";
import { useCharacters } from "@/hooks/useCharacters";
import { useWeapons } from "@/hooks/useWeapons";

export function useGachaDisplay(bannerId: number) {
  const activeGameUid = useMemo(
    () => localStorage.getItem("selected_game_uid") || "0",
    [],
  );

  const {
    isLoading: isCharsLoading,
    characters,
    refetch: refetchCharacters,
  } = useCharacters();
  const {
    isLoading: isWeaponsLoading,
    weapons,
    refetch: refetchWeapons,
  } = useWeapons();
  const { update: updateGacha, isUpdating } = useUpdateGacha(
    bannerId,
    activeGameUid,
  );

  const handleUpdate = async () => {
    if (isUpdating || bannerId < 1) return;
    await Promise.all([updateGacha(), refetchCharacters(), refetchWeapons()]);
  };

  const isInitialLoading =
    (isCharsLoading && characters.length === 0) ||
    (isWeaponsLoading && weapons.length === 0);

  return { activeGameUid, handleUpdate, isUpdating, isInitialLoading };
}
