export const SITE = {
  name: 'Peyote Labs',
  url: 'https://www.peyote-labs.com',
  email: 'hello@peyotelabs.com',
  linkedin: 'https://www.linkedin.com/company/peyote-labs-software-company/',
  location: 'Warsaw',
}

export type ServiceFaq = { q: string; a: string }

export type Service = {
  slug: string
  index: string
  name: string
  short: string
  outcome: string
  problem: string
  /** Extra depth for SEO — plain paragraphs under the problem */
  depth: string[]
  deliver: string[]
  process: string[]
  outcomes: string[]
  whoFor: string[]
  faqs: ServiceFaq[]
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
    depth: [
      'A site should do one job well: make the next step obvious. That means clear positioning, honest copy, and pages structured for both people and search engines — not a slideshow of features.',
      'We write before we decorate. Message, funnel, and technical SEO land in the first version. Design follows the argument, so you do not end up with a pretty page that cannot explain what you sell.',
      'You own the codebase. We ship on modern stacks (typically Next.js) with a component system your team can extend without calling us for every headline change.',
    ],
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
    whoFor: [
      'Founders who need a credible web presence for outreach and sales',
      'Teams stuck with a brochure site that does not convert',
      'Companies replacing an agency build they cannot maintain',
    ],
    faqs: [
      {
        q: 'How long does a typical site take?',
        a: 'Most marketing sites ship in weeks, not quarters — once message and scope are clear. We prefer an early real version over a long design phase.',
      },
      {
        q: 'Do you write the copy?',
        a: 'Yes. Copy is part of the build. We draft from your positioning and tighten with you — we do not leave “lorem ipsum” for later.',
      },
      {
        q: 'Will the site be SEO-ready?',
        a: 'Technical SEO is included: crawlable HTML, titles, meta, headings, sitemap/robots, and sensible internal links. Ranking still needs content depth and time.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. We hand over a repository and deploy setup you can keep, extend, or move.',
      },
      {
        q: 'Can you redesign an existing site?',
        a: 'Yes — when keeping the domain and fixing conversion/SEO is smarter than starting from zero. We say so when a rebuild is the wrong spend.',
      },
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
    depth: [
      'We treat SEO as a system: fix what blocks crawling and indexing, build pages that match real search intent, then automate the checks so regressions do not sneak back in.',
      'Content only compounds when it ships on a cadence. We set briefs, templates, and a publishing rhythm — and wire monitoring so you see movement, not vanity dashboards.',
      'Automation is where we are biased. If a ranking drop, indexing failure, or thin page can be caught by a script, it should not wait for a quarterly audit.',
    ],
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
    whoFor: [
      'Teams whose organic traffic stalled after a redesign or migration',
      'Founders who want SEO without hiring a full-time specialist yet',
      'Companies drowning in manual ranking checks and irregular publishing',
    ],
    faqs: [
      {
        q: 'Is this only technical SEO?',
        a: 'No. We cover technical foundations and content systems. Pure link-building campaigns are not our default offer.',
      },
      {
        q: 'What does “SEO automation” mean here?',
        a: 'Scripts and workflows for monitoring indexation, spotting regressions, and supporting a publishing cadence — so the work does not depend on someone remembering every week.',
      },
      {
        q: 'How soon will we see rankings?',
        a: 'Technical fixes can show in weeks; content compounds over months. We set expectations against your niche and current baseline — not fake “page one in 30 days” promises.',
      },
      {
        q: 'Do you need access to Search Console?',
        a: 'Yes, when available. GSC (and analytics) make prioritization honest. Without them we still audit the site, but decisions are weaker.',
      },
      {
        q: 'Can you work on an existing content site?',
        a: 'Yes. Often the win is pruning thin pages, fixing structure, and putting a real brief system around what already exists.',
      },
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
    depth: [
      'An audit is not a 60-slide deck. It is a teardown of funnel, site, messaging, and tracking — then a ranked list of what to cut, fix, and double down on.',
      'We start with whether the numbers are even real. Broken attribution and vanity metrics waste more budget than a weak creative ever will.',
      'You leave with a one-page plan the team can execute immediately, not a wishlist that dies in Notion.',
    ],
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
    whoFor: [
      'Teams spending on ads or content without a clear diagnosis',
      'Founders who inherited a messy funnel and conflicting reports',
      'Companies deciding what to fix before hiring more agencies',
    ],
    faqs: [
      {
        q: 'How long does an audit take?',
        a: 'Usually days to a couple of weeks depending on access and asset volume. Speed matters — the point is action the same week you get the plan.',
      },
      {
        q: 'What access do you need?',
        a: 'Site, analytics, ad accounts where relevant, and examples of current messaging. We work with what you can share; gaps become findings.',
      },
      {
        q: 'Will you implement the fixes?',
        a: 'We can. The audit stands alone, or it can lead into website, SEO, creative, or ads work with the same studio.',
      },
      {
        q: 'Is this only for paid ads?',
        a: 'No. We look across site, organic, creative, and paid when they affect the funnel. The scope is agreed up front.',
      },
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
    depth: [
      'Paid media dies when creative supply dies. We build batches around distinct angles — not fifteen crops of the same idea — sized for each placement and ready to ship.',
      'Angles come from positioning and data, not a moodboard. If an audit or account review exists, we use it; if not, we define the tests before we design.',
      'The deliverable is a cadence: refill the pipeline before winners burn out, so media buyers are never waiting on “the next concept.”',
    ],
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
    whoFor: [
      'Teams running ads with a thin creative bench',
      'Founders who need social and ad visuals without a full in-house studio',
      'Marketers stuck iterating one winning ad until it dies',
    ],
    faqs: [
      {
        q: 'Do you only make static images?',
        a: 'We cover the formats your channels need — static and motion where it earns its place. Scope is set per campaign.',
      },
      {
        q: 'How big is a batch?',
        a: 'Enough distinct angles to run a real test, not a single hero asset. Exact count depends on channels and budget.',
      },
      {
        q: 'Can this pair with your advertising service?',
        a: 'Yes. Creative supply plus campaign iteration is how spend stays tied to learning, not hope.',
      },
      {
        q: 'Who owns the files?',
        a: 'You do. Source files and export specs are part of the handoff.',
      },
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
    depth: [
      'We structure campaigns around a defined lead and a target CPA — then isolate what works so you can scale without guessing.',
      'Search and social get proper conversion tracking. Reporting follows leads and pipeline, not clicks and impressions dressed up as success.',
      'Weekly iteration on audience, creative, and offer is the job. Scale what hits the target; cut what does not. No “always-on” spend without a learning loop.',
    ],
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
    whoFor: [
      'Companies ready to spend with a defined cost-per-lead target',
      'Teams whose ad accounts grew messy without clear ownership',
      'Founders pairing paid with a site and offer that can convert',
    ],
    faqs: [
      {
        q: 'Which platforms do you run?',
        a: 'Typically search and major social placements. We pick channels that match your offer and funnel — not every network by default.',
      },
      {
        q: 'Do you need a creative supply?',
        a: 'Yes. Weak creative caps every account. We can produce creatives in-studio or work with yours.',
      },
      {
        q: 'What is a “lead” in your reporting?',
        a: 'Whatever you agree up front — form submit, qualified demo, purchase. Vague definitions are how accounts look busy and stay unprofitable.',
      },
      {
        q: 'Minimum budget?',
        a: 'Enough to learn. Below a real test threshold we will say advertising is the wrong next step and point you to site or offer work first.',
      },
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
