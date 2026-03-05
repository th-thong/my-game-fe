import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InlineEditableField } from "@/components/InlineEditableField";

export function AccountSetting() {
  const email = useUserStore((state) => state.email);
  const id = useUserStore((state) => state.id);
  const userName = useUserStore((state) => state.userName);

  const handleEdit = () => {
    console.log("Place holder");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 space-y-6">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Account ID</Label>
            <div className="flex items-center space-x-2">
              <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm font-semibold">
                {id}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(email)}
              >
                Copy
              </Button>
            </div>
          </div>

          <Separator />
          <InlineEditableField
            label="Email"
            initialValue={email}
            onSave={handleEdit}
          />
          <Separator />

          <InlineEditableField
            label="User Name"
            initialValue={userName}
            onSave={handleEdit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
