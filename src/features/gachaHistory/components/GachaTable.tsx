import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GachaPagination } from "./GachaPagination";
import type { GachaItem } from "../hooks/useGachaLog";

export function GachaTable({ logs }: { logs: GachaItem[] }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const totalPages = Math.max(1, Math.ceil(logs.length / PAGE_SIZE));
  const paginatedLogs = useMemo(
    () => logs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [logs, page],
  );

  const getQualityStyle = (q: number) => {
    if (q === 5) return "text-yellow-400 bg-yellow-400/5";
    if (q === 4) return "text-purple-400 bg-purple-400/5";
    return "text-emerald-500";
  };

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-zinc-800 overflow-hidden min-h-110 max-h-110">
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow className="border-zinc-800">
              <TableHead className="w-16 text-center">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-16 text-center">Pity</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((item, idx) => (
              <TableRow
                key={item.id}
                className={`border-zinc-800/50 ${item.qualityLevel >= 4 ? getQualityStyle(item.qualityLevel).split(" ")[1] : ""}`}
              >
                <TableCell className="text-center text-zinc-500">
                  {logs.length - ((page - 1) * PAGE_SIZE + idx)}
                </TableCell>
                <TableCell
                  className={`font-medium ${getQualityStyle(item.qualityLevel).split(" ")[0]}`}
                >
                  {item.name}
                </TableCell>
                <TableCell className="text-center font-mono">
                  {item.pity}
                </TableCell>
                <TableCell className="text-right text-xs text-zinc-500">
                  {item.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <GachaPagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={logs.length}
        onPageChange={setPage}
      />
    </div>
  );
}
