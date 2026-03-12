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

  // 1. Lấy Timezone Offset (ví dụ: GMT+7)
  const timeZoneLabel = useMemo(() => {
    const offset = new Date().getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    return `GMT${offset <= 0 ? "+" : "-"}${hours}`;
  }, []);

  // 2. Hàm format thời gian local
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    // Format theo kiểu Việt Nam: DD/MM/YYYY, HH:mm
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const totalPages = Math.max(1, Math.ceil(logs.length / pageSize));
  const safePage = page > totalPages ? totalPages : page;

  const paginatedLogs = useMemo(
    () => logs.slice((safePage - 1) * pageSize, safePage * pageSize),
    [logs, safePage, pageSize],
  );

  const emptyRows = pageSize - paginatedLogs.length;

  return (
    <div className="space-y-2 w-full overflow-hidden">
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
        <Table className="table-fixed w-full">
          <TableHeader className="bg-zinc-800/30">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="w-12 lg:w-16 text-center text-[10px] uppercase font-bold text-zinc-500">
                No
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-zinc-500">
                Name
              </TableHead>
              <TableHead className="w-12 lg:w-16 text-center text-[10px] uppercase font-bold text-zinc-500">
                Pity
              </TableHead>
              {/* Tăng độ rộng cột Time và thêm Timezone label */}
              <TableHead className="w-32 lg:w-44 text-right text-[10px] uppercase font-bold text-zinc-500">
                Time ({timeZoneLabel})
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((item, idx) => (
              <TableRow
                key={item.id}
                className="group border-b border-zinc-800/30 last:border-0 h-10 lg:h-12 transition-colors hover:bg-zinc-800/40"
              >
                <TableCell className="text-center text-xs text-zinc-600 font-mono">
                  {logs.length - ((safePage - 1) * pageSize + idx)}
                </TableCell>
                <TableCell className="py-1">
                  <div
                    className={`truncate text-xs lg:text-sm ${
                      item.qualityLevel === 5
                        ? "text-yellow-400 font-bold"
                        : item.qualityLevel === 4
                          ? "text-purple-400 font-semibold"
                          : "text-emerald-500/80"
                    }`}
                  >
                    {item.name}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-xs font-mono bg-zinc-800/50 px-1.5 py-0.5 rounded text-zinc-300">
                    {item.pity}
                  </span>
                </TableCell>
                <TableCell className="text-right py-1">
                  <span className="text-[10px] lg:text-xs text-zinc-500 font-mono block truncate">
                    {formatDateTime(item.time)}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, i) => (
                <TableRow
                  key={`empty-${i}`}
                  className="h-10 lg:h-12 border-none"
                >
                  <TableCell colSpan={4} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <GachaPagination
        currentPage={safePage}
        totalPages={totalPages}
        totalRecords={logs.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
