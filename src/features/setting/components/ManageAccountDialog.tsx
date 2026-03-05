import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { useGameAccount } from "@/features/setting/hooks/useGameAccount";
import { Trash2, Plus, Loader2 } from "lucide-react";

export function ManageAccountDialog() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const { createAccount, deleteAccount, isAdding, isDeleting } =
    useGameAccount();
  const [newUid, setNewUid] = useState("");

  const handleAdd = async () => {
    if (!newUid.trim()) return;

    const isSuccess = await createAccount(newUid);
    if (isSuccess) {
      setNewUid("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Manage Account
        </Button>
      </DialogTrigger>
      <DialogContent className="dark bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle>Manage Game Accounts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter new UID..."
              value={newUid}
              onChange={(e) => setNewUid(e.target.value)}
              disabled={isAdding}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
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
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {gameAccountList.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-2 bg-muted rounded-md border border-transparent hover:border-border transition-all"
              >
                <span className="font-mono">{account.uid}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => deleteAccount(account.uid)}
                  disabled={isDeleting === account.uid}
                >
                  {isDeleting === account.uid ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}

            {gameAccountList.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-4">
                No accounts yet.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
