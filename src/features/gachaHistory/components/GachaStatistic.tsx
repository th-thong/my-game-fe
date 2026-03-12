import { use } from "react";
import type { GachaDataResult } from "../hooks/useGachaPromise";

interface GachaStatisticProps {
  gachaPromise: Promise<GachaDataResult>;
  bannerId: number;
}

export function GachaStatistic({
  gachaPromise,
  bannerId,
}: GachaStatisticProps) {
  const { logs } = use(gachaPromise);

  const totalPulls = logs.length;
  const totalAstrites = totalPulls * 160;
  const fiveStars = logs.filter((l) => l.qualityLevel === 5).length;
  const fourStars = logs.filter((l) => l.qualityLevel === 4).length;

  // Avg 5-star pity
  const fiveStarIndices = logs
    .map((l, idx) => (l.qualityLevel === 5 ? idx : -1))
    .filter((idx) => idx !== -1);
  let avgFiveStar = "---";
  if (fiveStarIndices.length > 0) {
    let pityArr = [];
    for (let i = 0; i < fiveStarIndices.length; i++) {
      const prev = i === 0 ? -1 : fiveStarIndices[i - 1];
      pityArr.push(fiveStarIndices[i] - prev);
    }
    avgFiveStar = (pityArr.reduce((a, b) => a + b, 0) / pityArr.length).toFixed(
      1,
    );
  }

  // Avg 4-star pity
  const fourStarIndices = logs
    .map((l, idx) => (l.qualityLevel === 4 ? idx : -1))
    .filter((idx) => idx !== -1);
  let avgFourStar = "---";
  if (fourStarIndices.length > 0) {
    let pityArr = [];
    for (let i = 0; i < fourStarIndices.length; i++) {
      const prev = i === 0 ? -1 : fourStarIndices[i - 1];
      pityArr.push(fourStarIndices[i] - prev);
    }
    avgFourStar = (pityArr.reduce((a, b) => a + b, 0) / pityArr.length).toFixed(
      1,
    );
  }

  const standardBanner5Stars = [
    "Jianxin",
    "Calcharo",
    "Verina",
    "Lingyang",
    "Encore",
  ];

  const excludedBanners = [2, 3, 4, 5, 6, 7, 9];
  const isExcluded = excludedBanners.includes(bannerId);

  const fiveStarLogs = logs.filter((l) => l.qualityLevel === 5);
  const standard = fiveStarLogs.filter((l) =>
    standardBanner5Stars.includes(l.name),
  ).length;

  let winCount = 0;
  let lossCount = 0;

  if (!isExcluded && fiveStars > 0) {
    const lastFiveStar = fiveStarLogs[fiveStarLogs.length - 1];
    const lastIsStandard = standardBanner5Stars.includes(lastFiveStar.name);

    if (lastIsStandard) {
      winCount = fiveStars + 1 - 2 * standard;
      lossCount = standard;
    } else {
      winCount = fiveStars - 2 * standard;
      lossCount = standard;
    }
  }

  const totalLimited = winCount + lossCount;
  const hasData = totalLimited > 0;

  const winRate = isExcluded
    ? 100
    : hasData
      ? Math.round((winCount / totalLimited) * 100)
      : 0;

  const winRateDisplay = isExcluded ? "100%" : hasData ? `${winRate}%` : "100%";

  return (
    <div className="flex items-center gap-2 pl-2 pb-0 px-2 py-2 bg-zinc-900/40 rounded-xl border border-zinc-800/60 shadow-inner backdrop-blur-md whitespace-nowrap overflow-x-auto max-w-full scrollbar-hide">
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[70px]">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
          50/50 Win
        </span>
        <span className="text-base font-bold text-emerald-400 drop-shadow-sm">
          {winRateDisplay}
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
        <span className="text-[10px] text-yellow-600/60 uppercase tracking-widest font-bold mb-0.5">
          Avg 5-Star
        </span>
        <span className="text-base font-bold text-yellow-500 drop-shadow-sm">
          {avgFiveStar}
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
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0"></div>
      <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[60px]">
        <span className="text-[10px] text-purple-500/60 uppercase tracking-widest font-bold mb-0.5">
          Avg 4-Star
        </span>
        <span className="text-base font-bold text-purple-400 drop-shadow-sm">
          {avgFourStar}
        </span>
      </div>
    </div>
  );
}
