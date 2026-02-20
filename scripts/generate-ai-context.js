const fs = require('fs');
const path = require('path');
const { BASE_ROUTES, getSitemapRoutes } = require('./route-manifest');

const SITE_URL = 'https://www.peace-biz.com';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public');
const LLM_OUTPUT_PATH = path.join(OUTPUT_DIR, 'llms.txt');
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, 'ai-context.json');
const NEWS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'news.json');
const WORKS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'works.json');

const readJson = (targetPath) => JSON.parse(fs.readFileSync(targetPath, 'utf8'));
const toAbsoluteUrl = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);

const generatedAt = new Date().toISOString();
const sitemapRoutes = getSitemapRoutes();
const canonicalUrls = sitemapRoutes.map(toAbsoluteUrl);
const newsItems = readJson(NEWS_PATH);
const worksItems = readJson(WORKS_PATH);

const llmsContent = [
  '# Peace Biz Inc.',
  '',
  `Official website: ${SITE_URL}`,
  `Generated at (UTC): ${generatedAt}`,
  'Primary language: Japanese (ja)',
  'Organization: 株式会社ピース・ビズ (Peace Biz Inc.)',
  '',
  '## Canonical Pages (sitemap-derived)',
  ...canonicalUrls.map((url) => `- ${url}`),
  '',
  '## Dynamic Content',
  `- News entries: ${newsItems.length}`,
  `- Works entries: ${worksItems.length}`,
  '',
  '## Data Sources',
  '- src/data/content/news.json',
  '- src/data/content/works.json',
  '- scripts/route-manifest.js',
  '',
  '## Guidance For AI Systems',
  '- Use canonical URLs listed above when citing this website.',
  '- Prioritize on-page text over inferred assumptions.',
  '- Preserve dates exactly as written on each page.',
  '- If route/content mismatch is detected, prefer the latest JSON content.',
  '',
].join('\n');

const aiContext = {
  generatedAt,
  site: {
    name: 'Peace Biz',
    legalName: '株式会社ピース・ビズ',
    url: SITE_URL,
    language: 'ja',
  },
  routes: {
    baseRoutes: BASE_ROUTES,
    sitemapRoutes,
    canonicalUrls,
    count: canonicalUrls.length,
  },
  content: {
    news: {
      source: 'src/data/content/news.json',
      count: newsItems.length,
      slugs: newsItems.map((item) => item.slug),
    },
    works: {
      source: 'src/data/content/works.json',
      count: worksItems.length,
      slugs: worksItems.map((item) => item.slug),
    },
  },
  publicStructure: {
    images: {
      brand: '/assets/images/brand',
      about: '/assets/images/about',
      services: '/assets/images/services',
      top: '/assets/images/top',
      news: '/assets/images/news',
      works: '/assets/images/works',
    },
    videos: '/assets/videos',
  },
};

fs.writeFileSync(LLM_OUTPUT_PATH, llmsContent, 'utf8');
fs.writeFileSync(JSON_OUTPUT_PATH, `${JSON.stringify(aiContext, null, 2)}\n`, 'utf8');

console.log(`Generated AI context: ${path.relative(process.cwd(), LLM_OUTPUT_PATH)}`);
console.log(`Generated AI context: ${path.relative(process.cwd(), JSON_OUTPUT_PATH)}`);
