import { use, Suspense, useTransition, useState } from "react";
import type { BaseStats } from "../hooks/useInGameStat";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useIngameStat } from "../hooks/useInGameStat";
import { Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function IngameStatContent({ statPromise }: { statPromise: Promise<unknown> }) {
  const { data, error } = use(statPromise) as {
    data: BaseStats | null;
    error: string | null;
  };

  const displayData = data || {
    Name: "???",
    Id: "???",
    CreatTime: null,
    ActiveDays: "???",
    Level: "???",
    RoleNum: "???",
    Energy: "???",
    MaxEnergy: "???",
    StoreEnergy: "???",
  };

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="text-sm text-destructive text-center flex flex-col">
          <Link to="/settings?category=game-data" className="hover:underline">
            Add OAuth Code in Settings
          </Link>
        </div>
      )}
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground w-1/2">Name</TableCell>
            <TableCell>{displayData.Name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">UID</TableCell>
            <TableCell>{displayData.Id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Created</TableCell>
            <TableCell>
              {displayData.CreatTime
                ? new Date(displayData.CreatTime * 1000).toLocaleDateString()
                : "???"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Active Days</TableCell>
            <TableCell>{displayData.ActiveDays}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Level</TableCell>
            <TableCell>{displayData.Level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Characters</TableCell>
            <TableCell>{displayData.RoleNum}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Energy</TableCell>
            <TableCell>
              {displayData.Energy} / {displayData.MaxEnergy}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Stored Energy
            </TableCell>
            <TableCell>{displayData.StoreEnergy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function IngameStat() {
  const { promise, refetch } = useIngameStat();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 768 : true,
  );

  const handleUpdate = () => {
    startTransition(() => {
      refetch();
    });
  };

  return (
    <Card className="w-full border-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base sm:text-lg">Account Data</CardTitle>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="min-h-[350px] min-w-[250px] flex flex-col justify-center">
            <Suspense
              fallback={
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              }
            >
              <IngameStatContent statPromise={promise} />
            </Suspense>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleUpdate}
              disabled={isPending}
              className="w-full"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Update
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
