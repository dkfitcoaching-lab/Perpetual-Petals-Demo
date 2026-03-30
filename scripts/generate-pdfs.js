import puppeteer from 'puppeteer-core';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, '..', 'documents');
const outDir = path.join(docsDir, 'pdf');

const CHROME_PATH = '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome';

const DOCS = [
  { file: '01-executive-proposal.md', title: 'Executive Proposal', subtitle: 'Digital Presence Strategy' },
  { file: '02-market-analysis.md', title: 'Market Analysis', subtitle: 'Competitive Intelligence & ROI Projections' },
  { file: '03-statement-of-work.md', title: 'Statement of Work', subtitle: 'Scope, Deliverables & Terms' },
  { file: '04-content-brief.md', title: 'Content Brief', subtitle: 'Photography, Copy & Asset Requirements' },
  { file: '05-growth-roadmap.md', title: 'Growth Roadmap', subtitle: '12-Month Expansion Strategy' },
];

// Botanical ornament SVGs — exact from the live website
const GOLD_ORNAMENT = `<svg viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="16" x2="56" y2="16" stroke="#C9A87C" stroke-width="0.5"/><g transform="translate(80, 16)"><ellipse cx="0" cy="-5" rx="2.5" ry="6" transform="rotate(-36)" fill="none" stroke="#C9A87C" stroke-width="0.5" opacity="0.8"/><ellipse cx="0" cy="-5" rx="2.5" ry="6" transform="rotate(-18)" fill="none" stroke="#C9A87C" stroke-width="0.5" opacity="0.8"/><ellipse cx="0" cy="-5" rx="2.5" ry="6" transform="rotate(0)" fill="none" stroke="#C9A87C" stroke-width="0.5" opacity="0.8"/><ellipse cx="0" cy="-5" rx="2.5" ry="6" transform="rotate(18)" fill="none" stroke="#C9A87C" stroke-width="0.5" opacity="0.8"/><ellipse cx="0" cy="-5" rx="2.5" ry="6" transform="rotate(36)" fill="none" stroke="#C9A87C" stroke-width="0.5" opacity="0.8"/><circle cx="0" cy="0" r="1.2" fill="#C9A87C" opacity="0.6"/></g><line x1="104" y1="16" x2="160" y2="16" stroke="#C9A87C" stroke-width="0.5"/></svg>`;

const ROSE_ORNAMENT = `<svg viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80 2c-8 0-14 6-22 10s-18 6-28 6M80 2c8 0 14 6 22 10s18 6 28 6" stroke="#B8757A" stroke-width="0.75" opacity="0.45"/><ellipse cx="80" cy="16" rx="6" ry="14" fill="#B8757A" opacity="0.08"/><ellipse cx="80" cy="16" rx="6" ry="14" fill="#B8757A" opacity="0.06" transform="rotate(60 80 16)"/><ellipse cx="80" cy="16" rx="6" ry="14" fill="#B8757A" opacity="0.06" transform="rotate(-60 80 16)"/><circle cx="80" cy="16" r="2.5" fill="#B8757A" opacity="0.18"/><circle cx="30" cy="18" r="1.2" fill="#B8757A" opacity="0.2"/><circle cx="130" cy="18" r="1.2" fill="#B8757A" opacity="0.2"/><path d="M30 18c6-1 10 2 16 0s10-5 16-4" stroke="#B8757A" stroke-width="0.5" opacity="0.2"/><path d="M130 18c-6-1-10 2-16 0s-10-5-16-4" stroke="#B8757A" stroke-width="0.5" opacity="0.2"/></svg>`;

function buildCSS() {
  return `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');

@page { size: letter; margin: 0; }
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10.5pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

body {
  font-family: 'Raleway', 'Helvetica Neue', sans-serif;
  font-weight: 300;
  color: #4A3F36;
  line-height: 1.75;
  letter-spacing: 0.01em;
  background: #FDF8F6;
}

/* ======== COVER PAGE ======== */
.cover {
  width: 8.5in; height: 11in;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  background: linear-gradient(170deg, #1A1516 0%, #0D0B0A 60%, #2A1E20 100%);
  color: #F2E4E0;
  page-break-after: always;
  position: relative; overflow: hidden;
}
.cover::before {
  content: ''; position: absolute;
  top: 36px; left: 36px; right: 36px; bottom: 36px;
  border: 1px solid rgba(201,168,124,0.18);
}
.cover__ornament { margin-bottom: 40px; opacity: 0.85; }
.cover__ornament svg { width: 140px; height: 28px; display: block; }
.cover__brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300; font-size: 40pt; letter-spacing: 4px;
  color: #F2E4E0; margin-bottom: 4px; line-height: 1.1;
}
.cover__est {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 7.5pt; letter-spacing: 3px; text-transform: uppercase;
  color: #C9A87C; margin-bottom: 48px; opacity: 0.7;
}
.cover__rule {
  width: 40px; height: 1px; background: #C9A87C;
  border: none; margin-bottom: 36px; opacity: 0.4;
}
.cover__title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300; font-size: 26pt; line-height: 1.25;
  letter-spacing: 1px; color: #F2E4E0; max-width: 440px; margin-bottom: 10px;
}
.cover__subtitle {
  font-family: 'Raleway', sans-serif; font-weight: 300;
  font-size: 8.5pt; letter-spacing: 3px; text-transform: uppercase;
  color: #D4A0A5; margin-bottom: 64px;
}
.cover__meta {
  font-family: 'Raleway', sans-serif; font-weight: 300;
  font-size: 7pt; letter-spacing: 2px; text-transform: uppercase;
  color: #A89092; line-height: 2.4;
}
.cover__meta span { display: block; }
.cover__confidential {
  position: absolute; bottom: 24px; left: 0; right: 0;
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 5.5pt; letter-spacing: 3px; text-transform: uppercase;
  color: #B8757A; opacity: 0.35; text-align: center;
}

/* ======== CONTENT PAGES ======== */
.page {
  width: 8.5in; min-height: 11in;
  padding: 0.8in 1.05in 1.1in 1.05in;
  background: #FDF8F6;
  background-image: radial-gradient(ellipse at 50% 0%, rgba(184,117,122,0.03), transparent 70%);
  position: relative;
  page-break-after: always;
  box-sizing: border-box;
}

/* Running header */
.page-header {
  position: absolute; top: 0.45in; left: 1.05in; right: 1.05in;
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 8px;
  border-bottom: 0.5px solid #E8DCD5;
}
.page-header__brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300; font-size: 8pt; letter-spacing: 2px;
  color: #B8757A; opacity: 0.5;
}
.page-header__doc {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 6pt; letter-spacing: 2px; text-transform: uppercase;
  color: #635145; opacity: 0.4;
}

/* Running footer */
.page-footer {
  position: absolute; bottom: 0.5in; left: 1.05in; right: 1.05in;
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 8px;
  border-top: 0.5px solid #E8DCD5;
}
.page-footer__left {
  font-family: 'Raleway', sans-serif; font-weight: 300;
  font-size: 6pt; letter-spacing: 1.5px; text-transform: uppercase;
  color: #635145; opacity: 0.4;
}
.page-footer__center {
  position: absolute; left: 50%; transform: translateX(-50%);
  line-height: 0;
}
.page-footer__center svg { width: 60px; height: 16px; opacity: 0.3; }
.page-footer__right {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 7pt; color: #B8757A; opacity: 0.4;
}

/* ======== DOCUMENT FOOTER (last page) ======== */
.doc-footer {
  margin-top: 48px; padding-top: 24px;
  border-top: 1px solid #DDD0C7; text-align: center;
}
.doc-footer__ornament { margin: 0 auto 14px; line-height: 0; }
.doc-footer__ornament svg { width: 100px; height: 20px; }
.doc-footer__brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300; font-size: 14pt; color: #1C1410;
  letter-spacing: 3px; margin-bottom: 2px;
}
.doc-footer__est {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 6.5pt; letter-spacing: 3px; text-transform: uppercase;
  color: #C9A87C; margin-bottom: 3px;
}
.doc-footer__location {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 7pt; letter-spacing: 3px; text-transform: uppercase;
  color: #635145; margin-bottom: 8px;
}
.doc-footer__credit {
  font-family: 'Raleway', sans-serif; font-weight: 300;
  font-size: 6.5pt; color: #B8757A; letter-spacing: 1px;
}

/* ======== TYPOGRAPHY ======== */
.content h2 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300; font-size: 16pt; color: #1C1410;
  letter-spacing: 0.5px; text-align: center;
  margin: 28px 0 6px; padding-bottom: 12px;
  line-height: 1.3; position: relative;
}
.content h2::after {
  content: ''; display: block;
  width: 48px; height: 2px; background: #B8757A;
  margin: 8px auto 0; border-radius: 1px;
}
.content h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500; font-size: 12pt; color: #1C1410;
  letter-spacing: 0.3px; margin: 20px 0 5px; line-height: 1.4;
}
.content h4 {
  font-family: 'Raleway', sans-serif; font-weight: 500;
  font-size: 7.5pt; letter-spacing: 2.5px; text-transform: uppercase;
  color: #B8757A; margin: 16px 0 5px;
}
.content p {
  margin-bottom: 9px; font-size: 9.5pt; line-height: 1.75; color: #4A3F36;
}
.content p:first-child {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 11pt; font-weight: 300; font-style: italic;
  color: #635145; line-height: 1.8; margin-bottom: 14px;
}
.content strong { font-weight: 500; color: #1C1410; }
.content em { font-style: italic; color: #9E5A60; }

.content ul, .content ol {
  margin: 5px 0 12px 16px; font-size: 9.5pt;
  line-height: 1.75; color: #4A3F36;
}
.content li { margin-bottom: 2px; padding-left: 3px; }
.content li::marker { color: #B8757A; }

.content blockquote {
  margin: 16px 0; padding: 14px 20px;
  background: rgba(184,117,122,0.10);
  border-left: 3px solid #B8757A; border-radius: 0 4px 4px 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 11pt; font-style: italic; color: #635145; line-height: 1.7;
}

.content table {
  width: 100%; border-collapse: collapse;
  margin: 12px 0 18px; font-size: 8.5pt;
}
.content thead { background: #F7EFEB; }
.content th {
  font-family: 'Raleway', sans-serif; font-weight: 500;
  font-size: 6.5pt; letter-spacing: 1.5px; text-transform: uppercase;
  color: #9E5A60; text-align: left;
  padding: 8px 10px; border-bottom: 2px solid #DDD0C7;
}
.content td {
  padding: 8px 10px; border-bottom: 1px solid #DDD0C7;
  color: #4A3F36; line-height: 1.6; vertical-align: top; font-size: 8.5pt;
}
.content tbody tr:last-child td { border-bottom: 2px solid #DDD0C7; }

.content hr {
  border: none; height: 0; margin: 20px auto;
  text-align: center; overflow: visible;
}
.content hr::after {
  content: ''; display: inline-block;
  width: 48px; height: 1px;
  background: linear-gradient(90deg, transparent, #DDD0C7, transparent);
}

/* ======== CONFIDENTIAL NOTICE ======== */
.confidential {
  font-family: 'Raleway', sans-serif; font-weight: 400;
  font-size: 6pt; letter-spacing: 3px; text-transform: uppercase;
  color: #B8757A; opacity: 0.45; text-align: center;
  margin-bottom: 20px;
}
`;
}

function buildCoverHTML(doc) {
  return `
<div class="cover">
  <div class="cover__ornament">${GOLD_ORNAMENT}</div>
  <div class="cover__brand">Perpetual Petals</div>
  <div class="cover__est">Est. 2024</div>
  <hr class="cover__rule">
  <div class="cover__title">${doc.title}</div>
  <div class="cover__subtitle">${doc.subtitle}</div>
  <div class="cover__meta">
    <span>Prepared for Lori Fronzak, Founder &amp; Creative Director</span>
    <span>Prepared by Vermillion Axis Technologies</span>
    <span>March 2026</span>
  </div>
  <div class="cover__confidential">Confidential</div>
</div>`;
}

function buildPageHeader(docTitle) {
  return `
  <div class="page-header">
    <div class="page-header__brand">Perpetual Petals</div>
    <div class="page-header__doc">${docTitle}</div>
  </div>`;
}

function buildPageFooter(pageNum) {
  return `
  <div class="page-footer">
    <div class="page-footer__left">Vermillion Axis Technologies</div>
    <div class="page-footer__center">${ROSE_ORNAMENT}</div>
    <div class="page-footer__right">${pageNum}</div>
  </div>`;
}

function buildDocFooter() {
  return `
<div class="doc-footer">
  <div class="doc-footer__ornament">${ROSE_ORNAMENT}</div>
  <div class="doc-footer__brand">Perpetual Petals</div>
  <div class="doc-footer__est">Est. 2024</div>
  <div class="doc-footer__location">Windermere, Florida</div>
  <div class="doc-footer__credit">Website by Vermillion Axis Technologies &mdash; vermillionaxis.tech</div>
</div>`;
}

function markdownToPages(mdContent, docTitle) {
  // Remove the first H1 and meta lines (we use cover page instead)
  let cleaned = mdContent.replace(/^#\s+.+\n/m, '');
  // Remove standalone meta lines like "**Prepared...**"
  cleaned = cleaned.replace(/^\*\*Prepared.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*March.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*Agreement.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*Effective.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*Document Class.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*Date:.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^\*\*Classification:.+\*\*$/gm, '');
  cleaned = cleaned.replace(/^## Perpetual Petals$/m, '');
  // Remove "---" horizontal rules (they become empty sections)
  cleaned = cleaned.replace(/^---\s*$/gm, '');
  // Remove copyright/contact footer lines
  cleaned = cleaned.replace(/^\*This document contains.+\*$/gm, '');
  cleaned = cleaned.replace(/^\*© 2026.+\*$/gm, '');

  // Split on H2 sections (## headings)
  const sections = cleaned.split(/(?=^## )/m).filter(s => {
    // Only keep sections that have real content (not just whitespace)
    const stripped = s.replace(/^##.+$/m, '').trim();
    return stripped.length > 10;
  });

  const pages = [];
  let pageNum = 1;

  for (const section of sections) {
    const htmlContent = marked.parse(section, { gfm: true, breaks: false });

    pages.push(`
<div class="page">
  ${buildPageHeader(docTitle)}
  <div class="content">
    <p class="confidential">Confidential &mdash; Prepared Exclusively for Perpetual Petals</p>
    ${htmlContent}
  </div>
  ${buildPageFooter(pageNum)}
</div>`);
    pageNum++;
  }

  // Add doc footer to last page
  if (pages.length > 0) {
    const lastIdx = pages.length - 1;
    pages[lastIdx] = pages[lastIdx].replace('</div>\n  <div class="page-footer">', `${buildDocFooter()}</div>\n  <div class="page-footer">`);
  }

  return pages.join('\n');
}

function buildFullHTML(doc, mdContent) {
  const contentPages = markdownToPages(mdContent, doc.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Perpetual Petals — ${doc.title}</title>
<style>${buildCSS()}</style>
</head>
<body>
${buildCoverHTML(doc)}
${contentPages}
</body>
</html>`;
}

async function generatePDFs() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const doc of DOCS) {
    const mdPath = path.join(docsDir, doc.file);
    const pdfPath = path.join(outDir, doc.file.replace('.md', '.pdf'));

    console.log(`\nGenerating: ${doc.title}...`);
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const html = buildFullHTML(doc, mdContent);

    // Write HTML for debugging
    const htmlPath = path.join(outDir, doc.file.replace('.md', '.html'));
    fs.writeFileSync(htmlPath, html);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    await page.close();
    console.log(`  ✓ ${pdfPath}`);
  }

  await browser.close();
  console.log('\nAll PDFs generated successfully.');
}

generatePDFs().catch(err => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
