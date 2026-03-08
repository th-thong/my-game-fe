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
import type { GachaItem } from "../hooks/useGachaPromise";

export function GachaTable({ logs }: { logs: GachaItem[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(logs.length / pageSize));

  if (page > totalPages && totalPages > 0) {
    setPage(totalPages);
  }

  const paginatedLogs = useMemo(
    () => logs.slice((page - 1) * pageSize, page * pageSize),
    [logs, page, pageSize],
  );

  const getQualityStyle = (q: number) => {
    if (q === 5) return "text-yellow-400";
    if (q === 4) return "text-purple-400";
    return "text-emerald-500";
  };

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-zinc-800 overflow-hidden min-h-101">
        <Table>
          <TableHeader>
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
                className={`border-none transition-colors hover:bg-zinc-800/30 ${item.qualityLevel >= 4 ? getQualityStyle(item.qualityLevel).split(" ")[1] : ""}`}
              >
                <TableCell className="text-center text-zinc-500">
                  {logs.length - ((page - 1) * pageSize + idx)}
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
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
