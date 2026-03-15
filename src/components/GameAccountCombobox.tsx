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
  className?: string;
}

export function GameAccountCombobox({
  onSelectionChange,
  className,
}: GameAccountComboboxProps) {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const selectedGameUid = useUserStore((state) => state.selectedGameUid);
  const setSelectedGameUid = useUserStore((state) => state.setSelectedGameUid);

  const handleValueChange = (uid: string | null) => {
    setSelectedGameUid(uid);
    onSelectionChange?.();
  };

  return (
    <div className={className}>
      <Combobox
        value={selectedGameUid}
        inputValue={selectedGameUid ?? ""}
        onValueChange={handleValueChange}
        items={gameAccountList}
      >
        <ComboboxInput
          placeholder="Select Game Account"
          readOnly={true}
          onMouseDown={(e) => e.preventDefault()}
          onFocus={(e) => e.target.blur()}
          className="cursor-pointer caret-transparent select-none"
        />
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
    </div>
  );
}
