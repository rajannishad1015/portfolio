import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { chromePath } from './browser.mjs';

const URL = process.env.SITE_URL ?? 'http://localhost:4173';
const OUT = process.env.SHOT_DIR ?? 'shots';

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

const shots = [
  { name: 'hero-desktop', width: 1440, height: 950, full: false },
  { name: 'hero-desktop-full', width: 1440, height: 950, full: true },
  { name: 'hero-tablet', width: 820, height: 1100, full: false },
  { name: 'hero-mobile', width: 390, height: 844, full: false },
];

for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: shot.width,
    height: shot.height,
    deviceScaleFactor: 1,
  });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Reveal everything so the full page is captured, not just the first screen.
  await page.evaluate(async () => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previous;
    await new Promise((r) => setTimeout(r, 900));
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: shot.full });
  console.log(`saved ${OUT}/${shot.name}.png`);
  await page.close();
}

await browser.close();
