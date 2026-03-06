import { AvatarWithCount } from "./ItemIcon";
import type { GachaItem } from "../hooks/useGachaLog";

export function GachaAvatarList({ logs }: { logs: GachaItem[] }) {
  if (logs.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-wrap gap-4">
      {logs.map((item) => (
        <AvatarWithCount
          key={item.id}
          name={item.name}
          count={item.pity}
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
