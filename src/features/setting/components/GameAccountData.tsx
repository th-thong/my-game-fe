import { useUserStore, type GameAccount } from "@/store/useUserStore";
import { useGameAccount } from "@/features/setting/hooks/useGameAccount";
import { useState, useEffect } from "react";
import { GameAccountCombobox } from "@/components/GameAccountCombobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Download } from "lucide-react";
import { useExport } from "@/features/setting/hooks/useExport";

function ExportAction({ uid }: { uid: string }) {
  const { exportData, isExporting } = useExport();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => exportData(uid)}
      disabled={isExporting}
      className="w-9 sm:w-28 px-0 sm:px-3 flex-shrink-0"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
      ) : (
        <Download className="h-4 w-4 sm:mr-2" />
      )}
      <span className="hidden sm:inline">
        {isExporting ? "Exporting" : "Export"}
      </span>
    </Button>
  );
}

function DeleteAction({ uid }: { uid: string }) {
  const { deleteAccount, isDeleting } = useGameAccount();
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteCountdown(10);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteAccount(uid);
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
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteClick}
          disabled={isDeleting === uid}
          className="w-9 sm:w-28 px-0 sm:px-3 flex-shrink-0"
        >
          {isDeleting === uid ? (
            <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
          ) : (
            <Trash2 className="h-4 w-4 sm:mr-2" />
          )}
          <span className="hidden sm:inline">
            {isDeleting === uid ? "Deleting" : "Delete"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-background text-foreground border-border sm:max-w-[425px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm">
            Are you sure you want to delete the game account{" "}
            <span className="font-mono font-bold">{uid}</span>?
          </p>
          <p className="text-sm font-medium text-destructive">
            Warning: This action will permanently erase all your convene history
            associated with this UID. It cannot be undone.
          </p>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteCountdown !== null && deleteCountdown > 0}
              className="min-w-[140px]"
            >
              {deleteCountdown !== null && deleteCountdown > 0 ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wait {deleteCountdown}s
                </>
              ) : (
                "Yes, delete it"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GameAccountRow({ account }: { account: GameAccount }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold">
          Account UID: <span className="font-mono">{account.uid}</span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-sm font-medium">Export Data</div>
          <p className="text-xs text-muted-foreground">
            Download your convene records as JSON.
          </p>
        </div>
        <ExportAction uid={account.uid} />
      </div>

      <div className="flex items-center justify-between mt-2 pt-4 border-t border-destructive/20 gap-4">
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-destructive">
            Danger Zone
          </div>
          <p className="text-xs text-muted-foreground">
            Permanently delete this account and all its data.
          </p>
        </div>
        <DeleteAction uid={account.uid} />
      </div>
    </div>
  );
}

export function GameAccountData() {
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const currentUid = useUserStore((state) => state.selectedGameUid);

  const selectedAccount = gameAccountList?.find(
    (acc) => acc.uid === currentUid,
  );

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between gap-2 mb-4">
        <div className="text-sm font-semibold flex items-center">
          Game Accounts
        </div>
        <GameAccountCombobox />
      </div>

      <div className="flex flex-col gap-4">
        {selectedAccount ? (
          <GameAccountRow key={selectedAccount.uid} account={selectedAccount} />
        ) : (
          <div className="text-center p-8 border border-dashed rounded-lg bg-muted/10">
            <p className="text-sm text-muted-foreground">
              {gameAccountList && gameAccountList.length > 0
                ? "Please select an account from the list."
                : "No accounts have been linked yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
