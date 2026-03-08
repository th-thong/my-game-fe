import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useUserStore } from "@/store/useUserStore";

interface GameAccountComboboxProps {
  onSelectionChange?: () => void;
}

export function GameAccountCombobox({
  onSelectionChange,
}: GameAccountComboboxProps) {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const selectedGameUid = useUserStore((state) => state.selectedGameUid);
  const setSelectedGameUid = useUserStore((state) => state.setSelectedGameUid);

  const handleValueChange = (uid: string | null) => {
    setSelectedGameUid(uid);
    onSelectionChange?.();
  };

  return (
    <Combobox
      value={selectedGameUid}
      onValueChange={handleValueChange}
      items={gameAccountList}
    >
      <ComboboxInput placeholder="Select Game Account" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item.uid}
              value={item.uid}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {item.uid}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
