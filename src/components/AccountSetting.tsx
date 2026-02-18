import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AccountSetting() {
  const email = useUserStore((state) => state.email);
  const id = useUserStore((state) => state.id);
  const userName = useUserStore((state) => state.userName);

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

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Địa chỉ Email</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  readOnly
                  className="bg-muted/50"
                />
                <Button variant="outline">Change Email</Button>
              </div>
            </div>
          </div>
          <Separator />


          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">User Name</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  readOnly
                  className="bg-muted/50"
                />
                <Button variant="outline">Change User Name</Button>
              </div>
            </div>
          </div>


        </CardContent>
      </Card>
    </div>
  );
}
