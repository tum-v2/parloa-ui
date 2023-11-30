export interface MergedDatapoint {
  x: number;
  [key: string]: number;
}

export interface BarChartData {
  key: string;
  dataPoints: Datapoint[];
}

export interface Datapoint {
  x: number;
  y: number;
}

export interface TooltipData {
  x: number;
  y: number;
  color: string;
}
