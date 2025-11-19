export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut';

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string | string[];
  backgroundColor?: string | string[];
  fill?: boolean;
}

export interface ChartPayload {
  type: ChartType;
  title?: string;
  data: {
    labels: (string | number)[];
    datasets: ChartDataset[];
  };
  options?: Record<string, unknown>;
  hoverInfo?: string[];
}
