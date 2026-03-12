import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function GachaPagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 px-2 py-4 border-t border-zinc-800/50">
      {/* Hàng 1: Tổng số và Page Size */}
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-zinc-500 font-medium">
          Total{" "}
          <span className="text-zinc-300">{totalRecords.toLocaleString()}</span>{" "}
          items
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-500 uppercase tracking-tighter">
            Rows:
          </span>
          <Select
            value={`${pageSize}`}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className="h-7 w-[65px] bg-zinc-900/50 border-zinc-800 text-[11px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {[10, 20, 50, 100].map((s) => (
                <SelectItem key={s} value={`${s}`} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hàng 2: Bộ điều hướng chính */}
      <div className="flex items-center justify-between bg-zinc-800/20 p-1 rounded-lg border border-zinc-800/40">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-zinc-800"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-zinc-800"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs font-mono font-bold">
          <span className="text-emerald-400">{currentPage}</span>
          <span className="text-zinc-600 mx-1">/</span>
          <span className="text-zinc-400">{totalPages}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-zinc-800"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-zinc-800"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
