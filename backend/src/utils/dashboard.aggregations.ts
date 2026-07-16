import type { Model } from 'mongoose';

export type DashboardBucket = {
  key: string;
  label: string;
  start: Date;
  end: Date;
};

export type SummaryCounter = {
  key: string;
  condition: Record<string, unknown>;
};

export type MetricSeriesPoint = {
  label: string;
  value: number;
};

export type DashboardSummaryRow = Record<string, number> & { total: number };

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DASHBOARD_MONTHS = 6;
export const RECENT_LIST_LIMIT = 5;
export const RECENT_ACTIVITY_LIMIT = 10;

export function buildMonthBuckets(monthCount = DASHBOARD_MONTHS): DashboardBucket[] {
  const buckets: DashboardBucket[] = [];
  const now = new Date();

  for (let offset = monthCount - 1; offset >= 0; offset -= 1) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    const key = `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, '0')}`;

    buckets.push({
      key,
      label: MONTH_LABELS[start.getUTCMonth()],
      start,
      end: new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1)),
    });
  }

  return buckets;
}

export async function aggregateSummary(
  model: Model<unknown>,
  counters: SummaryCounter[] = [],
  match: Record<string, unknown> = { isDeleted: { $ne: true } },
): Promise<DashboardSummaryRow> {
  const groupStage = { _id: null, total: { $sum: 1 } } as Record<string, unknown>;

  for (const counter of counters) {
    groupStage[counter.key] = { $sum: { $cond: [counter.condition, 1, 0] } };
  }

  const [row] = await model.aggregate([
    { $match: match },
    { $group: groupStage as { _id: null; total: { $sum: 1 }; [key: string]: unknown } },
  ]);

  return {
    total: Number(row?.total ?? 0),
    ...counters.reduce<Record<string, number>>((accumulator, counter) => {
      accumulator[counter.key] = Number(row?.[counter.key] ?? 0);
      return accumulator;
    }, {}),
  };
}

export async function aggregateMonthlySeries(
  model: Model<unknown>,
  monthBuckets: DashboardBucket[],
  match: Record<string, unknown> = { isDeleted: { $ne: true } },
  dateField: 'createdAt' | 'updatedAt' = 'createdAt',
): Promise<MetricSeriesPoint[]> {
  const [firstBucket] = monthBuckets;
  const lastBucket = monthBuckets[monthBuckets.length - 1];

  const rows = await model.aggregate([
    {
      $match: {
        ...match,
        [dateField]: {
          $gte: firstBucket.start,
          $lt: lastBucket.end,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: `$${dateField}` },
          month: { $month: `$${dateField}` },
        },
        value: { $sum: 1 },
      },
    },
  ]);

  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = `${row._id.year}-${String(row._id.month).padStart(2, '0')}`;
    counts.set(key, Number(row.value ?? 0));
  }

  return monthBuckets.map((bucket) => ({
    label: bucket.label,
    value: counts.get(bucket.key) ?? 0,
  }));
}

export function calculateTrend(series: MetricSeriesPoint[]): number {
  const current = series.at(-1)?.value ?? 0;
  const previous = series.at(-2)?.value ?? 0;

  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export function buildMonthlyGrowth(
  contactsSeries: MetricSeriesPoint[],
  applicationsSeries: MetricSeriesPoint[],
  subscribersSeries: MetricSeriesPoint[],
): Array<{ label: string; contacts: number; applications: number; subscribers: number }> {
  return contactsSeries.map((point, index) => ({
    label: point.label,
    contacts: point.value,
    applications: applicationsSeries[index]?.value ?? 0,
    subscribers: subscribersSeries[index]?.value ?? 0,
  }));
}

export type ExtendedMonthlyGrowthPoint = {
  label: string;
  contacts: number;
  applications: number;
  subscribers: number;
  services: number;
  solutions: number;
  industries: number;
  jobs: number;
  portfolio: number;
  content: number;
  cmsUpdates: number;
};

export function buildExtendedMonthlyGrowth(series: {
  contacts: MetricSeriesPoint[];
  applications: MetricSeriesPoint[];
  subscribers: MetricSeriesPoint[];
  services: MetricSeriesPoint[];
  solutions: MetricSeriesPoint[];
  industries: MetricSeriesPoint[];
  jobs: MetricSeriesPoint[];
  portfolio: MetricSeriesPoint[];
  cmsUpdates: MetricSeriesPoint[];
}): ExtendedMonthlyGrowthPoint[] {
  return series.contacts.map((point, index) => {
    const services = series.services[index]?.value ?? 0;
    const solutions = series.solutions[index]?.value ?? 0;
    const industries = series.industries[index]?.value ?? 0;
    const jobs = series.jobs[index]?.value ?? 0;
    const portfolio = series.portfolio[index]?.value ?? 0;

    return {
      label: point.label,
      contacts: point.value,
      applications: series.applications[index]?.value ?? 0,
      subscribers: series.subscribers[index]?.value ?? 0,
      services,
      solutions,
      industries,
      jobs,
      portfolio,
      content: services + solutions + industries + jobs + portfolio,
      cmsUpdates: series.cmsUpdates[index]?.value ?? 0,
    };
  });
}

export function sumSeriesValues(series: MetricSeriesPoint[]): number {
  return series.reduce((sum, point) => sum + point.value, 0);
}

export function mergeMonthlySeries(seriesList: MetricSeriesPoint[][]): MetricSeriesPoint[] {
  const [first] = seriesList;
  if (!first?.length) return [];

  return first.map((point, index) => ({
    label: point.label,
    value: seriesList.reduce((sum, series) => sum + (series[index]?.value ?? 0), 0),
  }));
}

export function toStatusData(rows: Array<{ name: string; value: number }>): Array<{ name: string; value: number }> {
  return rows.filter((item) => item.value > 0);
}
