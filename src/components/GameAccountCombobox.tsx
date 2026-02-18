import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useUserStore } from "@/store/useUserStore"

export function GameAccountCombobox() {
  const gameAccountList = useUserStore((state)=>state.gameUIDList)
  return (
    <Combobox items={gameAccountList}>
      <ComboboxInput placeholder="Select Game Account" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}