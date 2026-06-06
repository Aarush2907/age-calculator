<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — agecalconline.com</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: #f5f5f5;
            color: #171717;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
          a { color: #0070f3; text-decoration: none; }
          a:hover { text-decoration: underline; }

          /* Header */
          .header {
            background: #ffffff;
            border-bottom: 1px solid #ebebeb;
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .header-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 700;
            font-size: 15px;
            color: #171717;
            text-decoration: none;
          }
          .header-logo svg { flex-shrink: 0; }
          .header-logo-accent { color: #0070f3; }
          .header-meta {
            margin-left: auto;
            font-size: 12px;
            color: #888;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
          }

          /* Hero */
          .hero {
            background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
            border-bottom: 1px solid #ebebeb;
            padding: 48px 24px 40px;
          }
          .hero-inner { max-width: 960px; margin: 0 auto; }
          .hero-badge {
            display: inline-block;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #0070f3;
            background: #d3e5ff;
            padding: 3px 10px;
            border-radius: 9999px;
            border: 1px solid rgba(0,112,243,0.2);
            margin-bottom: 16px;
          }
          .hero h1 {
            font-size: 2.2rem;
            font-weight: 800;
            letter-spacing: -1.5px;
            color: #171717;
            margin-bottom: 10px;
          }
          .hero p {
            font-size: 15px;
            color: #4d4d4d;
            max-width: 520px;
          }

          /* Stats bar */
          .stats-bar {
            background: #171717;
            padding: 16px 24px;
          }
          .stats-inner {
            max-width: 960px;
            margin: 0 auto;
            display: flex;
            gap: 40px;
          }
          .stat {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .stat-value {
            font-size: 1.4rem;
            font-weight: 800;
            letter-spacing: -1px;
            color: #ffffff;
          }
          .stat-label {
            font-size: 10px;
            color: rgba(255,255,255,0.5);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
          }

          /* Table */
          .table-wrap {
            max-width: 960px;
            margin: 32px auto;
            padding: 0 24px;
          }
          .section-label {
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #888;
            margin-bottom: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            border: 1px solid #ebebeb;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          }
          thead {
            background: #f5f5f5;
            border-bottom: 1px solid #ebebeb;
          }
          th {
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: #888;
            padding: 12px 20px;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
          }
          td {
            padding: 14px 20px;
            font-size: 14px;
            border-bottom: 1px solid #f0f0f0;
            color: #4d4d4d;
            vertical-align: middle;
          }
          td:first-child { font-weight: 500; }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #fafafa; }

          /* Priority pill */
          .pill {
            display: inline-block;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 9999px;
          }
          .pill-high   { background: #dcfce7; color: #166534; }
          .pill-medium { background: #dbeafe; color: #1e40af; }
          .pill-low    { background: #f5f5f5; color: #888888; border: 1px solid #e5e5e5; }

          /* Footer */
          .footer-bar {
            max-width: 960px;
            margin: 24px auto 48px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #888;
          }
          .footer-bar a { color: #0070f3; }
        </style>
      </head>
      <body>

        <!-- Header -->
        <div class="header">
          <a href="/" class="header-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#171717" stroke-width="1.5"/>
              <path d="M12 7v5l3 3" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Age<span class="header-logo-accent">Calc</span>
          </a>
          <span class="header-meta">XML Sitemap</span>
        </div>

        <!-- Hero -->
        <div class="hero">
          <div class="hero-inner">
            <div class="hero-badge">Sitemap</div>
            <h1>XML Sitemap</h1>
            <p>This is the sitemap for <strong>agecalconline.com</strong>. It lists all public pages to help search engines discover and index content efficiently.</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-bar">
          <div class="stats-inner">
            <div class="stat">
              <span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <span class="stat-label">Total URLs</span>
            </div>
            <div class="stat">
              <span class="stat-value"><xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></span>
              <span class="stat-label">Last Modified</span>
            </div>
            <div class="stat">
              <span class="stat-value">agecalconline.com</span>
              <span class="stat-label">Domain</span>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="table-wrap">
          <p class="section-label">All indexed pages</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                <tr>
                  <td style="color:#888;font-family:monospace;font-size:12px;">
                    <xsl:value-of select="position()"/>
                  </td>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td style="font-family:monospace;font-size:12px;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td style="font-family:monospace;font-size:12px;text-transform:capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.9">
                        <span class="pill pill-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.7">
                        <span class="pill pill-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="pill pill-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="footer-bar">
          <span>&#169; <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod,1,4)"/> agecalconline.com</span>
          <span>Generated with <a href="https://astro.build">Astro</a></span>
        </div>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
