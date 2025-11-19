import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import type { ChartPayload } from '@/types/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const chartComponents = {
  line: Line,
  bar: Bar,
  pie: Pie,
  doughnut: Doughnut,
} as const;

type ChartBlockProps = {
  payload: ChartPayload;
};

export const ChartBlock = ({ payload }: ChartBlockProps) => {
  const ChartComponent = chartComponents[payload.type];

  const options = useMemo(() => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' as const },
        title: payload.title
          ? { display: true, text: payload.title }
          : undefined,

        tooltip: {
          callbacks: {
            // `ctx` is a TooltipItem for the active item
            label: (ctx: any) => {
              const dataIndex = ctx.dataIndex;
              const dataset = ctx.dataset; // dataset object shown by Chart.js
              const datasetHoverInfo = (dataset &&
                (dataset as any).hoverInfo) as string[] | undefined;
              const payloadHoverInfo = (payload as any).hoverInfo as
                | string[]
                | undefined;

              // Priority #1: dataset-level hoverInfo (dataset.hoverInfo[dataIndex])
              if (datasetHoverInfo && datasetHoverInfo[dataIndex] != null) {
                // return either a string or an array of strings (tooltip supports array -> multi-line)
                return datasetHoverInfo[dataIndex];
              }

              // Priority #2: top-level payload hoverInfo (payload.hoverInfo[dataIndex])
              if (payloadHoverInfo && payloadHoverInfo[dataIndex] != null) {
                return payloadHoverInfo[dataIndex];
              }

              // Fallback: default label (dataset label + value)
              const label = ctx.dataset?.label ?? '';
              const value = ctx.formattedValue ?? ctx.raw ?? '';
              return label ? `${label}: ${value}` : String(value);
            },
            // You can optionally override the title too (shows above tooltip)
            title: (items: any[]) => {
              if (!items || items.length === 0) return '';
              const first = items[0];
              // use the x-axis label (or label reported by Chart.js)
              return first.label ?? first.title ?? '';
            },
          },
        },
      },
    };

    return {
      ...baseOptions,
      ...(payload.options || {}),
    };
  }, [payload]);

  if (!ChartComponent) return null;

  return (
    <div className='mt-3 rounded-lg border border-border bg-background/80 p-4'>
      <div className='h-64'>
        <ChartComponent data={payload.data as any} options={options} />
      </div>
    </div>
  );
};
