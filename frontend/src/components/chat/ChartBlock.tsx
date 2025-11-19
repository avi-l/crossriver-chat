import type { ChartPayload } from '@/types/chart';
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
import { useMemo } from 'react';

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
      },
    };

    return {
      ...baseOptions,
      ...(payload.options || {}),
    };
  }, [payload.options, payload.title]);

  if (!ChartComponent) return null;

  return (
    <div className='mt-3 rounded-lg border border-border bg-background/80 p-4'>
      <div className='h-64'>
        <ChartComponent data={payload.data as any} options={options} />
      </div>
    </div>
  );
};
