import { AvatarWithCount } from "./ItemIcon";

export interface GachaItem {
  id: string;
  resourceId: number;
  qualityLevel: number;
  name: string;
  time: string;
  pity: number;
  no: number;
}

export function GachaAvatarList({ logs }: { logs: GachaItem[] }) {
  if (logs.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-4">
      {logs.map((item) => (
        <AvatarWithCount
          key={item.id}
          name={item.name}
          count={item.pity}
          resourceId={item.resourceId}
          size="md"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <p className="text-sm text-muted-foreground italic w-full text-center py-8">
      No records found for this filter.
    </p>
  );
}
