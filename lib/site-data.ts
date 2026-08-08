export const SITE = {
  email: 'hello@peyotelabs.com',
  linkedin: 'https://www.linkedin.com/company/peyote-labs-software-company/',
  location: 'Warsaw',
}

export type Service = {
  slug: string
  index: string
  name: string
  short: string
  outcome: string
  problem: string
  deliver: string[]
  process: string[]
  outcomes: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'websites',
    index: '01',
    name: 'Website design & build',
    short:
      'Conversion-focused sites for companies that need a real face for outreach and sales.',
    outcome: 'Fast, clear, SEO-ready — shipped, not stuck in revisions.',
    problem:
      'Most company sites are slow, vague, and built to impress an agency — not to convert a visitor. They read like brochures and rank like ghosts.',
    deliver: [
      'A fast, responsive site with a clear message and a single obvious action per page',
      'Clean semantic markup and technical SEO baked in from the first commit',
      'A component system your team can extend without breaking the design',
      'Analytics and event tracking wired to the goals that matter',
    ],
    process: [
      'Map the funnel and the one decision each page should drive',
      'Write the copy first, design around the argument',
      'Build in production-grade components, ship a real version early',
      'Measure, then cut what does not earn its place',
    ],
    outcomes: [
      'A site that loads fast and reads clearly',
      'Pages structured to rank and to convert',
      'A codebase you own and can maintain',
    ],
  },
  {
    slug: 'seo',
    index: '02',
    name: 'SEO & SEO automation',
    short:
      'Technical and content SEO, plus systems that keep publishing and monitoring without weekly chaos.',
    outcome: 'Compounding organic reach that runs without babysitting.',
    problem:
      'SEO stalls when it depends on someone remembering to do it. Technical debt piles up, content ships in bursts, and nothing gets measured consistently.',
    deliver: [
      'A technical audit and fixes for crawlability, speed, and structure',
      'A content system with briefs, templates, and a publishing cadence',
      'Automation for monitoring rankings, indexing, and regressions',
      'Reporting that shows movement, not vanity metrics',
    ],
    process: [
      'Audit the technical foundation and fix what blocks growth',
      'Build the content and keyword system around real intent',
      'Automate the repetitive checks and publishing steps',
      'Review monthly, reprioritize on data',
    ],
    outcomes: [
      'A crawlable, fast, well-structured site',
      'Content that ships on a predictable cadence',
      'Automated monitoring that catches problems early',
    ],
  },
  {
    slug: 'marketing-audit',
    index: '03',
    name: 'Marketing audit',
    short:
      'An honest teardown of funnel, site, messaging, and tracking — what to cut, fix, and double.',
    outcome: 'A prioritized plan you can act on the same week.',
    problem:
      'Spend goes up, results stay flat, and no one can point to why. The data is either missing or nobody trusts it.',
    deliver: [
      'A full review of funnel, site, messaging, and channels',
      'A tracking and attribution check — is the data even real?',
      'A ranked list: cut, fix, double down',
      'A one-page plan the team can execute immediately',
    ],
    process: [
      'Pull the data and the assets, no sugarcoating',
      'Trace the funnel end to end and find the leaks',
      'Rank fixes by impact and effort',
      'Hand over a plan, not a 60-slide deck',
    ],
    outcomes: [
      'Clarity on what is actually working',
      'A short list of high-impact fixes',
      'Tracking you can trust',
    ],
  },
  {
    slug: 'creatives',
    index: '04',
    name: 'Creative generation',
    short:
      'Ad creatives, social visuals, and campaign angles — a production cadence, not a one-off moodboard.',
    outcome: 'A steady supply of creative to test and iterate on.',
    problem:
      'Creative is the biggest lever in paid, and it is usually the bottleneck. One good ad burns out and there is nothing behind it.',
    deliver: [
      'A batch of creatives built around distinct angles, not variations of one idea',
      'Formats sized for each placement, ready to ship',
      'A cadence that keeps fresh creative in the pipeline',
      'Angles informed by what the audit and data reveal',
    ],
    process: [
      'Define the angles worth testing',
      'Produce a batch across formats',
      'Ship, read the results, keep the winners',
      'Refill the pipeline before it runs dry',
    ],
    outcomes: [
      'Enough creative to actually test',
      'Angles grounded in real positioning',
      'A repeatable production rhythm',
    ],
  },
  {
    slug: 'advertising',
    index: '05',
    name: 'Advertising',
    short:
      'Campaign setup and iteration across search and social, tied to clear CPA and lead goals.',
    outcome: 'Spend that maps to leads, not impressions.',
    problem:
      'Ad accounts drift. Budgets spread thin across everything, targets are fuzzy, and nobody is accountable to a cost-per-lead.',
    deliver: [
      'Campaign structure built around clear CPA and lead targets',
      'Search and social setup with proper conversion tracking',
      'A test-and-iterate loop on audiences, creative, and offers',
      'Reporting tied to leads and pipeline, not clicks',
    ],
    process: [
      'Set the target CPA and the definition of a lead',
      'Structure campaigns to isolate what works',
      'Iterate on creative and audience weekly',
      'Scale what hits the target, cut what does not',
    ],
    outcomes: [
      'Campaigns tied to real goals',
      'Clear reporting on cost per lead',
      'A tested path to scale spend',
    ],
  },
]

export type Product = {
  slug: string
  name: string
  domain: string
  url: string
  tagline: string
  differentiator?: string
  features: { title: string; body: string }[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'jobcommand',
    name: 'JobCommand',
    domain: 'job-command.com',
    url: 'https://job-command.com',
    tagline: 'AI resume, cover letters, and a job pipeline in one place.',
    features: [
      {
        title: 'Tailored resumes',
        body: 'Paste a job description and get a resume aligned to it — built from what you actually did.',
      },
      {
        title: 'Cover letters',
        body: 'Generate a focused cover letter per application, editable before you send.',
      },
      {
        title: 'Visual pipeline',
        body: 'Track every application through Saved, Applied, Interview, and Offer.',
      },
      {
        title: 'Interview prep',
        body: 'Prepare with questions and notes tied to each role you are chasing.',
      },
    ],
  },
  {
    slug: 'wellfitcv',
    name: 'WellFitCV',
    domain: 'wellfitcv.com',
    url: 'https://wellfitcv.com',
    tagline: 'ATS-friendly resume tailoring from your real experience.',
    differentiator: 'Never fabricates experience.',
    features: [
      {
        title: 'ATS-parseable output',
        body: 'Resumes structured to pass applicant tracking systems cleanly.',
      },
      {
        title: 'Job-matched tailoring',
        body: 'Paste your resume and a job description — get a version aligned to the role.',
      },
      {
        title: 'Grounded in truth',
        body: 'Tailors only from experience you already have. It never invents roles or skills.',
      },
      {
        title: 'Fast iterations',
        body: 'Adjust and regenerate until the fit is right, without starting over.',
      },
    ],
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}
