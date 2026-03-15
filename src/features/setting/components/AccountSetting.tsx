/*
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "@/features/setting/hooks/useAccount";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useEffect } from "react";

function DangerZone() {
  const { deleteAccount, isDeleting } = useAccount();
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteCountdown(10);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteAccount();
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
    <div className="flex items-center justify-between pt-4 border-t border-destructive/20 gap-4">
      <div className="space-y-0.5">
        <div className="text-sm font-medium text-destructive">
          Danger Zone
        </div>
        <p className="text-xs text-muted-foreground">
          Permanently delete your account and all associated data.
        </p>
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="w-9 sm:w-28 px-0 sm:px-3 flex-shrink-0"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
            ) : (
              <Trash2 className="h-4 w-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">
              {isDeleting ? "Deleting" : "Delete"}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-background text-foreground border-border sm:max-w-[425px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Delete Account
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              Are you sure you want to delete your account?
            </p>
            <p className="text-sm font-medium text-destructive">
              Warning: This action will permanently erase your account and all
              associated data. It cannot be undone.
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
    </div>
  );
}

export function AccountSetting() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 space-y-6">
          <DangerZone />
        </CardContent>
      </Card>
    </div>
  );
}
*/
