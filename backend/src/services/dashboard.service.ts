import { cloudinary } from '@/config/cloudinary';
import { Service } from '@/models/Service';
import { Solution } from '@/models/Solution';
import { Industry } from '@/models/Industry';
import { ProjectModel } from '@/models/Project';
import { Job } from '@/models/Job';
import { JobApplication } from '@/models/JobApplication';
import { Contact } from '@/models/Contact';
import { Newsletter } from '@/models/Newsletter';
import { FAQModel } from '@/models/FAQ';
import { Office } from '@/models/Office';
import { Admin } from '@/models/Admin';
import { PagesCmsConfig, type IPagesCmsConfig } from '@/models/PagesCmsConfig';
import {
  aggregateMonthlySeries,
  aggregateSummary,
  buildExtendedMonthlyGrowth,
  buildMonthBuckets,
  calculateTrend,
  mergeMonthlySeries,
  RECENT_ACTIVITY_LIMIT,
  RECENT_LIST_LIMIT,
  toStatusData,
  type MetricSeriesPoint,
} from '@/utils/dashboard.aggregations';
import { getWebsiteHealth, type WebsiteHealth } from '@/utils/dashboard.health';
import { getSeoAnalytics, type SeoAnalytics } from '@/utils/dashboard.seo';
import {
  buildSystemStatus,
  getAverageContactResponseHours,
  getDatabaseStats,
  type DashboardSystemStatus,
} from '@/utils/dashboard.system';

type DashboardMetric = {
  key: string;
  title: string;
  value: number;
  description: string;
  trend: number;
  series: MetricSeriesPoint[];
};

type DashboardRecentActivity = {
  type: string;
  title: string;
  subtitle: string;
  status: string;
  href: string;
  createdAt: string;
};

type DashboardSystemStatusItem = DashboardSystemStatus;

type PlatformOverviewMetric = {
  key: string;
  label: string;
  value: number;
  trend: number;
};

export type DashboardResponse = {
  generatedAt: string;
  metrics: DashboardMetric[];
  platformOverview: {
    metrics: PlatformOverviewMetric[];
    series: Array<{
      label: string;
      contacts: number;
      applications: number;
      subscribers: number;
      content: number;
      cmsUpdates: number;
    }>;
  };
  contentDistribution: Array<{ name: string; value: number }>;
  applicationStatus: Array<{ name: string; value: number }>;
  contactStatus: Array<{ name: string; value: number }>;
  jobStatus: Array<{ name: string; value: number }>;
  projectStatus: Array<{ name: string; value: number }>;
  newsletterStatus: Array<{ name: string; value: number }>;
  monthlyGrowth: Array<{
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
  }>;
  recentActivity: DashboardRecentActivity[];
  recentContacts: Array<{ id: string; name: string; email: string; subject: string; status: string; createdAt: string }>;
  recentApplications: Array<{ id: string; fullName: string; email: string; position: string; status: string; createdAt: string }>;
  recentNewsletter: Array<{ id: string; email: string; source: string; status: string; createdAt: string }>;
  recentPortfolio: Array<{ id: string; title: string; status: string; featured: boolean; createdAt: string }>;
  recentCmsUpdates: Array<{ type: string; title: string; updatedBy: string; updatedAt: string }>;
  latestAdminActivity: Array<{ id: string; name: string; email: string; updatedAt: string }>;
  seoAnalytics: SeoAnalytics;
  websiteHealth: WebsiteHealth;
  contentStatistics: {
    offices: { total: number; active: number; inactive: number };
    admins: { total: number };
    pagesCms: { lastUpdatedAt: string | null; updatedBy: string };
    featured: {
      services: number;
      solutions: number;
      industries: number;
      projects: number;
      jobs: number;
      faqs: number;
    };
    published: { services: number; solutions: number; industries: number };
    draft: { services: number; solutions: number; industries: number; jobs: number };
    hidden: { faqs: number };
    archived: { contacts: number };
    averageContactResponseHours: number | null;
  };
  systemStatus: DashboardSystemStatusItem[];
  storageUsage: {
    available: boolean;
    usedBytes?: number;
    usedMB?: number;
    assetCount?: number;
    detail: string;
  } | null;
  databaseStats: { dataSizeMB: number; collections: number } | null;
};

function buildSeriesDescription(activeLabel: string, extra: string[] = []): string {
  return [activeLabel, ...extra].filter(Boolean).join(' · ');
}

function buildMetric(
  key: string,
  title: string,
  value: number,
  description: string,
  series: MetricSeriesPoint[],
): DashboardMetric {
  return {
    key,
    title,
    value,
    description,
    trend: calculateTrend(series),
    series,
  };
}

function mergeRecentActivity(
  activity: DashboardRecentActivity[],
  cmsUpdates: Array<{ type: string; title: string; updatedBy: string; updatedAt: string }>,
): DashboardRecentActivity[] {
  const hrefByType: Record<string, string> = {
    service: '/admin/services',
    solution: '/admin/solutions',
    industry: '/admin/industries',
    portfolio: '/admin/portfolio',
    'pages-cms': '/admin/pages',
  };

  const cmsActivity = cmsUpdates.map((item) => ({
    type: item.type,
    title: item.title,
    subtitle: item.updatedBy,
    status: 'updated',
    href: hrefByType[item.type] ?? '/admin/pages',
    createdAt: item.updatedAt,
  }));

  return [...activity, ...cmsActivity]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, RECENT_ACTIVITY_LIMIT);
}

async function getRecentActivity(limit = RECENT_ACTIVITY_LIMIT): Promise<DashboardRecentActivity[]> {
  const recent = await Service.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $project: {
        type: { $literal: 'service' },
        title: '$title',
        subtitle: '$status',
        status: '$status',
        href: { $literal: '/admin/services' },
        createdAt: '$createdAt',
      },
    },
    {
      $unionWith: {
        coll: 'solutions',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'solution' },
              title: '$title',
              subtitle: '$status',
              status: '$status',
              href: { $literal: '/admin/solutions' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'industries',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'industry' },
              title: '$title',
              subtitle: '$status',
              status: '$status',
              href: { $literal: '/admin/industries' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'projects',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'project' },
              title: '$title',
              subtitle: '$status',
              status: '$status',
              href: { $literal: '/admin/portfolio' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'jobs',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'job' },
              title: '$title',
              subtitle: '$status',
              status: '$status',
              href: { $literal: '/admin/jobs' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'jobapplications',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'application' },
              title: '$fullName',
              subtitle: '$email',
              status: '$status',
              href: { $literal: '/admin/applications' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'contacts',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'contact' },
              title: '$name',
              subtitle: '$serviceInterested',
              status: '$status',
              href: { $literal: '/admin/contacts' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'newsletters',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'newsletter' },
              title: '$email',
              subtitle: { $ifNull: ['$source', 'website'] },
              status: '$status',
              href: { $literal: '/admin/newsletter' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: 'faqs',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'faq' },
              title: '$question',
              subtitle: '$category',
              status: '$status',
              href: { $literal: '/admin/faqs' },
              createdAt: '$createdAt',
            },
          },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $project: {
        type: 1,
        title: 1,
        subtitle: 1,
        status: 1,
        href: 1,
        createdAt: { $toString: '$createdAt' },
      },
    },
  ]);

  return recent.map((item) => ({
    type: String(item.type ?? 'item'),
    title: String(item.title ?? 'Untitled'),
    subtitle: String(item.subtitle ?? ''),
    status: String(item.status ?? ''),
    href: String(item.href ?? '/admin/dashboard'),
    createdAt: String(item.createdAt ?? new Date().toISOString()),
  }));
}

async function getRecentContacts(limit = RECENT_LIST_LIMIT) {
  return Contact.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $project: {
        id: { $toString: '$_id' },
        name: 1,
        email: 1,
        subject: '$serviceInterested',
        status: 1,
        createdAt: { $toString: '$createdAt' },
      },
    },
  ]);
}

async function getRecentApplications(limit = RECENT_LIST_LIMIT) {
  return JobApplication.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'jobs',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        id: { $toString: '$_id' },
        fullName: 1,
        email: 1,
        position: { $ifNull: ['$job.title', 'Unknown position'] },
        status: 1,
        createdAt: { $toString: '$createdAt' },
      },
    },
  ]);
}

async function getRecentNewsletter(limit = RECENT_LIST_LIMIT) {
  return Newsletter.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $project: {
        id: { $toString: '$_id' },
        email: 1,
        source: { $ifNull: ['$source', 'website'] },
        status: 1,
        createdAt: { $toString: '$createdAt' },
      },
    },
  ]);
}

async function getRecentPortfolio(limit = RECENT_LIST_LIMIT) {
  return ProjectModel.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
    {
      $project: {
        id: { $toString: '$_id' },
        title: 1,
        status: 1,
        featured: { $ifNull: ['$featured', false] },
        createdAt: { $toString: '$createdAt' },
      },
    },
  ]);
}

async function getRecentCmsUpdates(limit = RECENT_LIST_LIMIT) {
  const contentUpdatePipeline = (type: string) => [
    { $match: { isDeleted: { $ne: true } } },
    { $sort: { updatedAt: -1 as const } },
    { $limit: limit },
    {
      $project: {
        type: { $literal: type },
        title: '$title',
        updatedBy: { $ifNull: ['$updatedBy', 'Admin'] },
        updatedAt: '$updatedAt',
      },
    },
  ];

  const recent = await Service.aggregate([
    ...contentUpdatePipeline('service'),
    {
      $unionWith: {
        coll: 'solutions',
        pipeline: contentUpdatePipeline('solution'),
      },
    },
    {
      $unionWith: {
        coll: 'industries',
        pipeline: contentUpdatePipeline('industry'),
      },
    },
    {
      $unionWith: {
        coll: 'projects',
        pipeline: contentUpdatePipeline('portfolio'),
      },
    },
    {
      $unionWith: {
        coll: 'pagescmsconfigs',
        pipeline: [
          { $sort: { updatedAt: -1 as const } },
          { $limit: limit },
          {
            $project: {
              type: { $literal: 'pages-cms' },
              title: { $literal: 'Pages CMS' },
              updatedBy: { $ifNull: ['$updatedBy', 'Admin'] },
              updatedAt: '$updatedAt',
            },
          },
        ],
      },
    },
    { $sort: { updatedAt: -1 as const } },
    { $limit: limit },
    {
      $project: {
        type: 1,
        title: 1,
        updatedBy: 1,
        updatedAt: { $toString: '$updatedAt' },
      },
    },
  ]);

  return recent;
}

async function getLatestAdminActivity(limit = RECENT_LIST_LIMIT) {
  return Admin.aggregate([
    { $sort: { updatedAt: -1 } },
    { $limit: limit },
    {
      $project: {
        id: { $toString: '$_id' },
        name: 1,
        email: 1,
        updatedAt: { $toString: '$updatedAt' },
      },
    },
  ]);
}

async function getStorageUsage(): Promise<DashboardResponse['storageUsage']> {
  try {
    const usage = await cloudinary.api.usage();
    const usedBytes = Number(usage?.storage?.usage ?? 0);
    const assetCount = Number(usage?.resources ?? usage?.objects?.usage ?? 0) || undefined;

    if (!usedBytes && !assetCount) {
      return { available: true, detail: 'Cloudinary connected' };
    }

    const usedMB = usedBytes ? Math.round(usedBytes / (1024 * 1024)) : undefined;
    const detailParts = [
      usedMB ? `${usedMB} MB used` : null,
      assetCount ? `${assetCount} assets` : null,
    ].filter(Boolean);

    return {
      available: true,
      usedBytes: usedBytes || undefined,
      usedMB,
      assetCount,
      detail: detailParts.join(' · ') || 'Cloudinary connected',
    };
  } catch {
    return { available: true, detail: 'Cloudinary configured' };
  }
}

export async function getDashboardSummary(): Promise<DashboardResponse> {
  const monthBuckets = buildMonthBuckets();

  const [
    servicesSummary,
    solutionsSummary,
    industriesSummary,
    projectsSummary,
    jobsSummary,
    applicationsSummary,
    contactsSummary,
    newslettersSummary,
    faqsSummary,
    officesSummary,
    adminsSummary,
    servicesSeries,
    solutionsSeries,
    industriesSeries,
    projectsSeries,
    jobsSeries,
    applicationsSeries,
    contactsSeries,
    newslettersSeries,
    faqsSeries,
    servicesUpdatedSeries,
    solutionsUpdatedSeries,
    industriesUpdatedSeries,
    projectsUpdatedSeries,
    recentActivityRaw,
    recentContacts,
    recentApplications,
    recentNewsletter,
    recentPortfolio,
    recentCmsUpdates,
    latestAdminActivity,
    pagesCmsDoc,
    storageUsage,
    databaseStats,
    averageContactResponseHours,
  ] = await Promise.all([
    aggregateSummary(Service, [
      { key: 'active', condition: { $eq: ['$status', 'active'] } },
      { key: 'draft', condition: { $eq: ['$status', 'draft'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(Solution, [
      { key: 'active', condition: { $eq: ['$status', 'active'] } },
      { key: 'draft', condition: { $eq: ['$status', 'draft'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(Industry, [
      { key: 'active', condition: { $eq: ['$status', 'active'] } },
      { key: 'draft', condition: { $eq: ['$status', 'draft'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(ProjectModel, [
      { key: 'completed', condition: { $eq: ['$status', 'Completed'] } },
      { key: 'inProgress', condition: { $eq: ['$status', 'In Progress'] } },
      { key: 'comingSoon', condition: { $eq: ['$status', 'Coming Soon'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(Job, [
      { key: 'active', condition: { $eq: ['$status', 'active'] } },
      { key: 'closed', condition: { $eq: ['$status', 'closed'] } },
      { key: 'draft', condition: { $eq: ['$status', 'draft'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(JobApplication, [
      { key: 'pending', condition: { $eq: ['$status', 'Pending'] } },
      { key: 'shortlisted', condition: { $eq: ['$status', 'Shortlisted'] } },
      { key: 'interview', condition: { $eq: ['$status', 'Interview'] } },
      { key: 'rejected', condition: { $eq: ['$status', 'Rejected'] } },
      { key: 'selected', condition: { $eq: ['$status', 'Selected'] } },
    ]),
    aggregateSummary(Contact, [
      { key: 'new', condition: { $eq: ['$status', 'new'] } },
      { key: 'inProgress', condition: { $eq: ['$status', 'in-progress'] } },
      { key: 'resolved', condition: { $eq: ['$status', 'resolved'] } },
      { key: 'archived', condition: { $eq: ['$status', 'archived'] } },
    ]),
    aggregateSummary(Newsletter, [
      { key: 'subscribed', condition: { $eq: ['$status', 'subscribed'] } },
      { key: 'unsubscribed', condition: { $eq: ['$status', 'unsubscribed'] } },
    ]),
    aggregateSummary(FAQModel, [
      { key: 'active', condition: { $eq: ['$status', 'active'] } },
      { key: 'inactive', condition: { $eq: ['$status', 'inactive'] } },
      { key: 'featured', condition: { $eq: ['$featured', true] } },
    ]),
    aggregateSummary(Office, [
      { key: 'active', condition: { $eq: ['$isActive', true] } },
      { key: 'inactive', condition: { $eq: ['$isActive', false] } },
    ]),
    aggregateSummary(Admin, []),
    aggregateMonthlySeries(Service, monthBuckets),
    aggregateMonthlySeries(Solution, monthBuckets),
    aggregateMonthlySeries(Industry, monthBuckets),
    aggregateMonthlySeries(ProjectModel, monthBuckets),
    aggregateMonthlySeries(Job, monthBuckets),
    aggregateMonthlySeries(JobApplication, monthBuckets),
    aggregateMonthlySeries(Contact, monthBuckets),
    aggregateMonthlySeries(Newsletter, monthBuckets),
    aggregateMonthlySeries(FAQModel, monthBuckets),
    aggregateMonthlySeries(Service, monthBuckets, { isDeleted: { $ne: true } }, 'updatedAt'),
    aggregateMonthlySeries(Solution, monthBuckets, { isDeleted: { $ne: true } }, 'updatedAt'),
    aggregateMonthlySeries(Industry, monthBuckets, { isDeleted: { $ne: true } }, 'updatedAt'),
    aggregateMonthlySeries(ProjectModel, monthBuckets, { isDeleted: { $ne: true } }, 'updatedAt'),
    getRecentActivity(),
    getRecentContacts(),
    getRecentApplications(),
    getRecentNewsletter(),
    getRecentPortfolio(),
    getRecentCmsUpdates(),
    getLatestAdminActivity(),
    PagesCmsConfig.findOne({ configKey: 'global' }).lean(),
    getStorageUsage(),
    getDatabaseStats(),
    getAverageContactResponseHours(),
  ]);

  const cmsUpdatesSeries = mergeMonthlySeries([
    servicesUpdatedSeries,
    solutionsUpdatedSeries,
    industriesUpdatedSeries,
    projectsUpdatedSeries,
  ]);

  const seoAnalytics = await getSeoAnalytics(pagesCmsDoc as IPagesCmsConfig | null);
  const systemStatus = buildSystemStatus();
  const websiteHealth = getWebsiteHealth(
    pagesCmsDoc as IPagesCmsConfig | null,
    seoAnalytics,
    systemStatus,
  );

  if (storageUsage?.detail) {
    const storageItem = systemStatus.find((item) => item.key === 'storage');
    if (storageItem) {
      storageItem.detail = storageUsage.detail;
      if (!storageUsage.available) {
        storageItem.status = 'offline';
        storageItem.healthPercent = 0;
      }
    }
  }

  const recentActivity = mergeRecentActivity(recentActivityRaw, recentCmsUpdates);

  const metrics = [
    buildMetric(
      'services',
      'Total Services',
      servicesSummary.total,
      buildSeriesDescription(`Active ${servicesSummary.active}`, [`Draft ${servicesSummary.draft}`, `Featured ${servicesSummary.featured}`]),
      servicesSeries,
    ),
    buildMetric(
      'industries',
      'Total Industries',
      industriesSummary.total,
      buildSeriesDescription(`Active ${industriesSummary.active}`, [`Draft ${industriesSummary.draft}`, `Featured ${industriesSummary.featured}`]),
      industriesSeries,
    ),
    buildMetric(
      'solutions',
      'Total Solutions',
      solutionsSummary.total,
      buildSeriesDescription(`Active ${solutionsSummary.active}`, [`Draft ${solutionsSummary.draft}`, `Featured ${solutionsSummary.featured}`]),
      solutionsSeries,
    ),
    buildMetric(
      'projects',
      'Portfolio Projects',
      projectsSummary.total,
      buildSeriesDescription(`Completed ${projectsSummary.completed}`, [`In progress ${projectsSummary.inProgress}`, `Featured ${projectsSummary.featured}`]),
      projectsSeries,
    ),
    buildMetric(
      'faqs',
      'Total FAQs',
      faqsSummary.total,
      buildSeriesDescription(`Active ${faqsSummary.active}`, [`Inactive ${faqsSummary.inactive}`, `Featured ${faqsSummary.featured}`]),
      faqsSeries,
    ),
    buildMetric(
      'jobs',
      'Total Jobs',
      jobsSummary.total,
      buildSeriesDescription(`Active ${jobsSummary.active}`, [`Closed ${jobsSummary.closed}`, `Featured ${jobsSummary.featured}`]),
      jobsSeries,
    ),
    buildMetric(
      'applications',
      'Total Applications',
      applicationsSummary.total,
      buildSeriesDescription(`Pending ${applicationsSummary.pending}`, [`Shortlisted ${applicationsSummary.shortlisted}`, `Interview ${applicationsSummary.interview}`]),
      applicationsSeries,
    ),
    buildMetric(
      'contacts',
      'Contact Inquiries',
      contactsSummary.total,
      buildSeriesDescription(`New ${contactsSummary.new}`, [`Resolved ${contactsSummary.resolved}`, `Archived ${contactsSummary.archived}`]),
      contactsSeries,
    ),
    buildMetric(
      'newsletter',
      'Newsletter Subscribers',
      newslettersSummary.total,
      buildSeriesDescription(`Subscribed ${newslettersSummary.subscribed}`, [`Unsubscribed ${newslettersSummary.unsubscribed}`]),
      newslettersSeries,
    ),
    buildMetric(
      'admins',
      'Active Admins',
      adminsSummary.total,
      buildSeriesDescription(`${adminsSummary.total} registered`, [`Offices ${officesSummary.active}`]),
      [{ label: 'Now', value: adminsSummary.total }],
    ),
  ];

  const monthlyGrowth = buildExtendedMonthlyGrowth({
    contacts: contactsSeries,
    applications: applicationsSeries,
    subscribers: newslettersSeries,
    services: servicesSeries,
    solutions: solutionsSeries,
    industries: industriesSeries,
    jobs: jobsSeries,
    portfolio: projectsSeries,
    cmsUpdates: cmsUpdatesSeries,
  });

  const inboundTotal =
    contactsSummary.total + applicationsSummary.total + newslettersSummary.subscribed;

  const inboundSeries = contactsSeries.map((point, index) => ({
    label: point.label,
    value: point.value + (applicationsSeries[index]?.value ?? 0) + (newslettersSeries[index]?.value ?? 0),
  }));

  const platformOverview = {
    metrics: [
      {
        key: 'inbound',
        label: 'Total Inbound',
        value: inboundTotal,
        trend: calculateTrend(inboundSeries),
      },
      {
        key: 'contacts',
        label: 'Contacts',
        value: contactsSummary.total,
        trend: calculateTrend(contactsSeries),
      },
      {
        key: 'applications',
        label: 'Applications',
        value: applicationsSummary.total,
        trend: calculateTrend(applicationsSeries),
      },
      {
        key: 'subscribers',
        label: 'Subscribers',
        value: newslettersSummary.subscribed,
        trend: calculateTrend(newslettersSeries),
      },
    ],
    series: monthlyGrowth.map((row) => ({
      label: row.label,
      contacts: row.contacts,
      applications: row.applications,
      subscribers: row.subscribers,
      content: row.content,
      cmsUpdates: row.cmsUpdates,
    })),
  };

  return {
    generatedAt: new Date().toISOString(),
    metrics,
    platformOverview,
    contentDistribution: toStatusData([
      { name: 'Services', value: servicesSummary.total },
      { name: 'Solutions', value: solutionsSummary.total },
      { name: 'Industries', value: industriesSummary.total },
      { name: 'Portfolio', value: projectsSummary.total },
      { name: 'Jobs', value: jobsSummary.total },
      { name: 'FAQs', value: faqsSummary.total },
    ]),
    applicationStatus: toStatusData([
      { name: 'Pending', value: applicationsSummary.pending },
      { name: 'Shortlisted', value: applicationsSummary.shortlisted },
      { name: 'Interview', value: applicationsSummary.interview },
      { name: 'Rejected', value: applicationsSummary.rejected },
      { name: 'Selected', value: applicationsSummary.selected },
    ]),
    contactStatus: toStatusData([
      { name: 'New', value: contactsSummary.new },
      { name: 'In Progress', value: contactsSummary.inProgress },
      { name: 'Resolved', value: contactsSummary.resolved },
      { name: 'Archived', value: contactsSummary.archived },
    ]),
    jobStatus: toStatusData([
      { name: 'Active', value: jobsSummary.active },
      { name: 'Closed', value: jobsSummary.closed },
      { name: 'Draft', value: jobsSummary.draft },
    ]),
    projectStatus: toStatusData([
      { name: 'Completed', value: projectsSummary.completed },
      { name: 'In Progress', value: projectsSummary.inProgress },
      { name: 'Coming Soon', value: projectsSummary.comingSoon },
    ]),
    newsletterStatus: toStatusData([
      { name: 'Subscribed', value: newslettersSummary.subscribed },
      { name: 'Unsubscribed', value: newslettersSummary.unsubscribed },
    ]),
    monthlyGrowth,
    recentActivity,
    recentContacts,
    recentApplications,
    recentNewsletter,
    recentPortfolio,
    recentCmsUpdates,
    latestAdminActivity,
    seoAnalytics,
    websiteHealth,
    contentStatistics: {
      offices: {
        total: officesSummary.total,
        active: officesSummary.active,
        inactive: officesSummary.inactive,
      },
      admins: { total: adminsSummary.total },
      pagesCms: {
        lastUpdatedAt: pagesCmsDoc?.updatedAt ? new Date(pagesCmsDoc.updatedAt).toISOString() : null,
        updatedBy: pagesCmsDoc?.updatedBy ?? '',
      },
      featured: {
        services: servicesSummary.featured,
        solutions: solutionsSummary.featured,
        industries: industriesSummary.featured,
        projects: projectsSummary.featured,
        jobs: jobsSummary.featured,
        faqs: faqsSummary.featured,
      },
      published: {
        services: servicesSummary.active,
        solutions: solutionsSummary.active,
        industries: industriesSummary.active,
      },
      draft: {
        services: servicesSummary.draft,
        solutions: solutionsSummary.draft,
        industries: industriesSummary.draft,
        jobs: jobsSummary.draft,
      },
      hidden: {
        faqs: faqsSummary.inactive,
      },
      archived: {
        contacts: contactsSummary.archived,
      },
      averageContactResponseHours,
    },
    systemStatus,
    storageUsage,
    databaseStats,
  };
}
