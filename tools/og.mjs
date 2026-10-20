import puppeteer from 'puppeteer-core';
import { chromePath } from './browser.mjs';

/**
 * Renders the hero into a 1200x630 social preview image.
 *
 * The page is laid out at 1900x1000 and then scaled down with `zoom`, so the
 * whole hero fits the Open Graph crop.
 */
const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(process.env.SITE_URL ?? 'http://localhost:4173', {
  waitUntil: 'networkidle0',
});
await new Promise((r) => setTimeout(r, 1200));

await page.addStyleTag({
  content: `
    html { zoom: 0.63; }
    main > section:not(#home), footer, header { display: none !important; }
    #home { padding-top: 0 !important; padding-bottom: 0 !important; min-height: 0 !important; }
    .animate-enter-up, .animate-enter-scale, .animate-enter-down {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    /* The placeholder caption is a development note, not part of a share. */
    p:has(> span:text-is("Portrait PNG goes here")) { display: none !important; }
  `,
});
await new Promise((r) => setTimeout(r, 500));

await page.screenshot({ path: 'public/og-image.png' });
console.log('saved public/og-image.png');

await browser.close();
