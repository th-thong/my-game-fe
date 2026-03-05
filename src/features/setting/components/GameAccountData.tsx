import { Label } from "@/components/ui/label";
import { useUserStore, type GameAccount } from "@/store/useUserStore";
import { useGameAccount } from "@/features/setting/hooks/useGameAccount";
import { InlineEditableField } from "@/components/InlineEditableField";
import { ReadOnlyInput } from "@/components/ReadOnlyInput";

export function GameAccountRow({ account }: { account: GameAccount }) {
  const { updateOauthCode } = useGameAccount();

  const handleSaveOauthCode = async (newValue: string) => {
    await updateOauthCode(account.uid, newValue);
  };

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30">
      <ReadOnlyInput
        label="Game UID"
        value={account.uid}
        className="w-[120px]"
      />

      <InlineEditableField
        label="OAuth Code"
        initialValue={account.oauthCode || ""}
        onSave={handleSaveOauthCode}
        className="flex-1"
        valueClassName="font-mono bg-background"
        placeholder="Enter OAuth Code..."
      />
    </div>
  );
}

export function GameAccountData() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);

  return (
    <div className="space-y-4">
      <Label>Registered Accounts</Label>
      <div className="flex flex-col gap-3">
        {gameAccountList && gameAccountList.length > 0 ? (
          gameAccountList.map((account) => (
            <GameAccountRow key={account.id} account={account} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No game account linked yet.
          </p>
        )}
      </div>
    </div>
  );
}
