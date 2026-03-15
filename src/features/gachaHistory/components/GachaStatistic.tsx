import { use } from "react";
import type { GachaDataResult } from "../hooks/useGachaPromise";

const STANDARD_5_STARS = [
  "Jianxin",
  "Calcharo",
  "Verina",
  "Lingyang",
  "Encore",
];
const EXCLUDED_BANNERS = [2, 3, 4, 5, 6, 7, 9];

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

  const getAveragePity = (quality: number) => {
    const indices = logs
      .map((l, idx) => (l.qualityLevel === quality ? idx : -1))
      .filter((idx) => idx !== -1);

    if (indices.length === 0) return "---";
    const sumPity = indices[indices.length - 1] + 1;
    return (sumPity / indices.length).toFixed(1);
  };

  const avgFiveStar = getAveragePity(5);
  const avgFourStar = getAveragePity(4);

  const fiveStarLogs = logs.filter((l) => l.qualityLevel === 5);
  const fiveStars = fiveStarLogs.length;
  const fourStars = logs.filter((l) => l.qualityLevel === 4).length;

  const isExcluded = EXCLUDED_BANNERS.includes(bannerId);
  const standardCount = fiveStarLogs.filter((l) =>
    STANDARD_5_STARS.includes(l.name),
  ).length;

  let winRateDisplay = "100%";

  if (!isExcluded && fiveStars > 0) {
    const lastFiveStar = fiveStarLogs[fiveStars - 1];
    const lastIsStandard = STANDARD_5_STARS.includes(lastFiveStar.name);

    const lossCount = standardCount;
    const winCount = lastIsStandard
      ? fiveStars + 1 - 2 * standardCount
      : fiveStars - 2 * standardCount;

    const totalLimited = winCount + lossCount;
    if (totalLimited > 0) {
      winRateDisplay = `${Math.round((winCount / totalLimited) * 100)}%`;
    }
  }

  const lastFiveStarIndex = logs
    .map((l, idx) => (l.qualityLevel === 5 ? idx : -1))
    .filter((idx) => idx !== -1)
    .pop();
  const current =
    lastFiveStarIndex !== undefined
      ? totalPulls - lastFiveStarIndex-1
      : totalPulls;

  const STATS_UI = [
    {
      label: "Current",
      value: current,
      labelClass: "text-zinc-500",
      valueClass: "text-emerald-400",
    },
    {
      label: "50/50 Win",
      value: winRateDisplay,
      labelClass: "text-zinc-500",
      valueClass: "text-emerald-400",
    },
    {
      label: "Pulls",
      value: totalPulls,
      labelClass: "text-zinc-500",
      valueClass: "text-zinc-100",
    },
    {
      label: "Astrites",
      value: totalAstrites.toLocaleString(),
      labelClass: "text-zinc-500",
      valueClass: "text-blue-400",
    },
    {
      label: "5-Star",
      value: fiveStars,
      labelClass: "text-yellow-600/80",
      valueClass: "text-yellow-500",
    },
    {
      label: "Avg 5-Star",
      value: avgFiveStar,
      labelClass: "text-yellow-600/60",
      valueClass: "text-yellow-500",
    },
    {
      label: "4-Star",
      value: fourStars,
      labelClass: "text-purple-500/80",
      valueClass: "text-purple-400",
    },
    {
      label: "Avg 4-Star",
      value: avgFourStar,
      labelClass: "text-purple-500/60",
      valueClass: "text-purple-400",
    },
  ];

  return (
    <div className="flex items-center gap-2 pl-2 pb-0 px-2 py-2 bg-zinc-900/40 rounded-xl border border-zinc-800/60 shadow-inner backdrop-blur-md whitespace-nowrap overflow-x-auto max-w-full scrollbar-hide">
      {STATS_UI.map((stat, index) => (
        <div key={stat.label} className="flex items-center gap-2">
          {index > 0 && (
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-700 to-transparent shrink-0" />
          )}
          <div className="flex flex-col items-center justify-center min-w-[50px] lg:min-w-[60px]">
            <span
              className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${stat.labelClass}`}
            >
              {stat.label}
            </span>
            <span
              className={`text-base font-bold drop-shadow-sm ${stat.valueClass}`}
            >
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
