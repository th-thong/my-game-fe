import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useUserStore } from "@/store/useUserStore";

export function GameAccountCombobox() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  return (
    <Combobox items={gameAccountList}>
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
