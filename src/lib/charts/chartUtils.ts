import { BarChartData, MergedDatapoint } from '@/types/chart';

/**
 * // Merges all y datapoints under the same x value e.g. [\{x:1, y:20\}, \{x:1, y:40\}] =\> [\{x: 1, y1: 20, y2: 40\}]
 * @param data - BarChart data object
 * @returns merged data object
 */
export function mergeBarChartDatapoints(
  data: BarChartData[]
): MergedDatapoint[] {
  const mergedData: MergedDatapoint[] = [];
  data.forEach(d => {
    d.dataPoints.forEach(dp => {
      const existing = mergedData.find(md => md.x === dp.x);
      if (existing) {
        existing[d.key] = dp.y;
      } else {
        const newMergedDataPoint: MergedDatapoint = {
          x: dp.x,
          [d.key]: dp.y
        };
        mergedData.push(newMergedDataPoint);
      }
    });
  });

  return mergedData;
}
