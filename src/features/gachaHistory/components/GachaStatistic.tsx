import { use } from "react";
import type { GachaDataResult } from "../hooks/useGachaPromise";

interface GachaStatisticProps {
  gachaPromise: Promise<GachaDataResult>;
}

export function GachaStatistic({ gachaPromise }: GachaStatisticProps) {
  const { logs } = use(gachaPromise);

  const totalPulls = logs.length;
  const totalAstrites = totalPulls * 160;
  const fiveStars = logs.filter((l) => l.qualityLevel === 5).length;
  const fourStars = logs.filter((l) => l.qualityLevel === 4).length;

  return (
    <div className="flex items-center gap-2 pl-2 pb-0 px-2 py-2 bg-zinc-900/40 rounded-xl border border-zinc-800/60 shadow-inner backdrop-blur-md whitespace-nowrap overflow-x-auto max-w-full scrollbar-hide">
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[70px]">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
          50/50 Win
        </span>
        <span className="text-base font-bold text-emerald-400 drop-shadow-sm">
          ---
        </span>
      </div>
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0"></div>
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[60px]">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
          Pulls
        </span>
        <span className="text-base font-bold text-zinc-100 drop-shadow-sm">
          {totalPulls}
        </span>
      </div>
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0"></div>
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[80px]">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
          Astrites
        </span>
        <span className="text-base font-bold text-blue-400 drop-shadow-sm">
          {totalAstrites.toLocaleString()}
        </span>
      </div>
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0"></div>
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[60px]">
        <span className="text-[10px] text-yellow-600/80 uppercase tracking-widest font-bold mb-0.5">
          5-Star
        </span>
        <span className="text-base font-bold text-yellow-500 drop-shadow-sm">
          {fiveStars}
        </span>
      </div>
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0"></div>
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[60px]">
        <span className="text-[10px] text-purple-500/80 uppercase tracking-widest font-bold mb-0.5">
          4-Star
        </span>
        <span className="text-base font-bold text-purple-400 drop-shadow-sm">
          {fourStars}
        </span>
      </div>
    </div>
  );
}
