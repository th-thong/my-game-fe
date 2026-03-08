import { Label } from "@/components/ui/label";
import { useUserStore, type GameAccount } from "@/store/useUserStore";
import { useGameAccount } from "@/features/setting/hooks/useGameAccount";
import { InlineEditableField } from "@/components/InlineEditableField";
import { ReadOnlyInput } from "@/components/ReadOnlyInput";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Loader2 } from "lucide-react";

export function GameAccountRow({ account }: { account: GameAccount }) {
  const { updateOauthCode, deleteAccount, isDeleting } = useGameAccount();
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveOauthCode = async (newValue: string) => {
    await updateOauthCode(account.uid, newValue);
  };

  const handleDeleteClick = () => {
    setDeleteCountdown(10);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteAccount(account.uid);
    setIsDeleteDialogOpen(false);
    setDeleteCountdown(null);
  };

  useEffect(() => {
    if (deleteCountdown === null || deleteCountdown <= 0) return;

    const timer = setTimeout(() => {
      setDeleteCountdown(deleteCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [deleteCountdown]);

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg bg-muted/30 pr-12">
      <ReadOnlyInput
        label="Game UID"
        value={account.uid}
        className="w-full sm:w-[120px]"
      />

      <InlineEditableField
        label="OAuth Code"
        initialValue={account.oauthCode || ""}
        onSave={handleSaveOauthCode}
        className="flex-1 w-full"
        valueClassName="font-mono bg-background"
        placeholder="Enter OAuth Code..."
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-destructive hover:bg-destructive/10"
            onClick={handleDeleteClick}
            disabled={isDeleting === account.uid}
          >
            {isDeleting === account.uid ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-background text-foreground border-border"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              Are you sure you want to delete the game account{" "}
              <span className="font-mono font-bold">{account.uid}</span>?
            </p>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteCountdown !== null && deleteCountdown > 0}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteCountdown !== null && deleteCountdown > 0}
                className="flex-1"
              >
                {deleteCountdown !== null && deleteCountdown > 0
                  ? `Delete (${deleteCountdown}s)`
                  : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function GameAccountData() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const { createAccount, isAdding } = useGameAccount();
  const [newUid, setNewUid] = useState("");

  const handleAdd = async () => {
    if (!newUid.trim()) return;

    const isSuccess = await createAccount(newUid);
    if (isSuccess) {
      setNewUid("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Registered Accounts</Label>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Enter new UID..."
            value={newUid}
            onChange={(e) => setNewUid(e.target.value)}
            disabled={isAdding}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="text-sm"
          />
          <Button
            onClick={handleAdd}
            disabled={isAdding || !newUid.trim()}
            size="icon"
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
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
