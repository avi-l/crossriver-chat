import type { ChartPayload, ChartType } from '@/types/chart';

const CHART_BLOCK_REGEX = /```chart\s*([\s\S]+?)```/i;
const ALLOWED_TYPES: ChartType[] = ['line', 'bar', 'pie', 'doughnut'];

type ParseResult = {
  text: string;
  chart?: ChartPayload;
};

const isValidDataset = (
  dataset: unknown
): dataset is ChartPayload['data']['datasets'][number] => {
  if (!dataset || typeof dataset !== 'object') return false;
  const { label, data } = dataset as Record<string, unknown>;
  return (
    typeof label === 'string' &&
    Array.isArray(data) &&
    data.every((value) => typeof value === 'number')
  );
};

const isValidChartPayload = (payload: unknown): payload is ChartPayload => {
  if (!payload || typeof payload !== 'object') return false;
  const { type, data } = payload as Record<string, unknown>;
  if (!ALLOWED_TYPES.includes(type as ChartType)) return false;
  if (!data || typeof data !== 'object') return false;

  const { labels, datasets } = data as Record<string, unknown>;
  if (
    !Array.isArray(labels) ||
    !Array.isArray(datasets) ||
    labels.length === 0 ||
    datasets.length === 0
  )
    return false;

  const labelsValid = labels.every(
    (label) => typeof label === 'string' || typeof label === 'number'
  );

  const datasetsValid = datasets.every((dataset) => isValidDataset(dataset));
  return labelsValid && datasetsValid;
};

export const extractChartPayload = (content: string): ParseResult => {
  const match = content.match(CHART_BLOCK_REGEX);
  if (!match) return { text: content };

  try {
    const rawJson = match[1].trim();
    const parsed = JSON.parse(rawJson);

    if (!isValidChartPayload(parsed)) {
      return { text: content };
    }

    const cleanedText = content.replace(match[0], '').trim();
    return {
      text: cleanedText || 'Here is your chart.',
      chart: parsed,
    };
  } catch (error) {
    console.warn('Failed to parse chart block:', error);
    return { text: content };
  }
};
