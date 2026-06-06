// src/pages/sitemap.xml.ts
// Dynamically generated sitemap served at /sitemap.xml

import type { APIRoute } from 'astro';

const SITE = 'https://agecalconline.com';

const pages = [
  // Core calculators
  { url: '/',                                     priority: '1.00', changefreq: 'daily'   },
  { url: '/age-difference-calculator',            priority: '0.90', changefreq: 'weekly'  },
  { url: '/birthday-calculator',                  priority: '0.90', changefreq: 'weekly'  },
  { url: '/chronological-age-calculator',         priority: '0.90', changefreq: 'weekly'  },
  { url: '/pregnancy-due-date-calculator',        priority: '0.90', changefreq: 'weekly'  },
  { url: '/menstrual-cycle-calculator',           priority: '0.90', changefreq: 'weekly'  },
  { url: '/bmi-calculator',                       priority: '0.90', changefreq: 'weekly'  },
  { url: '/work-hours-calculator',                priority: '0.88', changefreq: 'weekly'  },
  { url: '/percentage-calculator',                priority: '0.88', changefreq: 'weekly'  },
  { url: '/biological-age-calculator',            priority: '0.85', changefreq: 'weekly'  },
  { url: '/life-expectancy-calculator',           priority: '0.85', changefreq: 'weekly'  },
  { url: '/pet-age-calculator',                   priority: '0.85', changefreq: 'weekly'  },
  { url: '/retirement-calculator',                priority: '0.85', changefreq: 'weekly'  },
  { url: '/generation-calculator',                priority: '0.80', changefreq: 'weekly'  },
  { url: '/future-age-calculator',                priority: '0.80', changefreq: 'weekly'  },
  { url: '/reverse-age-calculator',               priority: '0.80', changefreq: 'weekly'  },
  // Company / info pages
  { url: '/about-us',                             priority: '0.60', changefreq: 'monthly' },
  { url: '/contact-us',                           priority: '0.60', changefreq: 'monthly' },
  { url: '/privacy-policy',                       priority: '0.40', changefreq: 'yearly'  },
  { url: '/terms-and-conditions',                 priority: '0.40', changefreq: 'yearly'  },
];

const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function buildSitemap(entries: typeof pages): string {
  const urls = entries
    .map(
      ({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

export const GET: APIRoute = () => {
  const body = buildSitemap(pages);
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'noindex', // sitemaps themselves should not be indexed
    },
  });
};
