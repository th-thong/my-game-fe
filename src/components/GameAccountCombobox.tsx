import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useUserStore } from "@/store/useUserStore";
import { useState, useEffect } from "react";

export function GameAccountCombobox() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const STORAGE_KEY = "selected_game_uid";

  const [selectedUid, setSelectedUid] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    if (selectedUid) {
      localStorage.setItem(STORAGE_KEY, selectedUid);
    }
  }, [selectedUid]);

  return (
    <Combobox
      value={selectedUid}
      onValueChange={setSelectedUid}
      items={gameAccountList}
    >
      <ComboboxInput placeholder="Select Game Account" />
      <ComboboxContent className="dark bg-background text-foreground">
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.uid} value={item.uid}>
              {item.uid}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
