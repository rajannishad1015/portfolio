import puppeteer from 'puppeteer-core';
import { chromePath, VIEWPORTS } from './browser.mjs';

const URL = process.env.SITE_URL ?? 'http://localhost:4173';

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

let problems = 0;

for (const width of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  const report = await page.evaluate(async () => {
    // The page sets `scroll-behavior: smooth`, which would make each scrollTo
    // animate and never reach the target before the next one interrupts it.
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.5;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previous;
    await new Promise((r) => setTimeout(r, 700));

    const vw = document.documentElement.clientWidth;
    const clipped = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          return true;
        }
      }
      return false;
    };

    const overflow = [];
    for (const el of Array.from(document.querySelectorAll('*'))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        if (getComputedStyle(el).position === 'absolute') continue;
        if (clipped(el)) continue;
        overflow.push({
          tag: el.tagName,
          cls: (el.className?.toString?.() ?? '').slice(0, 70),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    }

    const hidden = [];
    for (const section of Array.from(document.querySelectorAll('section'))) {
      const total = section.querySelectorAll('[data-reveal]').length;
      const shown = section.querySelectorAll(
        '[data-reveal][data-revealed="true"]',
      ).length;
      if (total > 0 && shown < total) {
        hidden.push(`${section.id}: ${shown}/${total} revealed`);
      }
    }

    return {
      vw,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: overflow.slice(0, 8),
      hidden,
    };
  });

  const bad = report.scrollWidth > report.vw || report.overflow.length || report.hidden.length;
  if (bad) problems += 1;
  console.log(
    `${bad ? 'FAIL' : 'ok  '} ${String(width).padStart(4)}px  client=${report.vw} scroll=${report.scrollWidth}`,
  );
  for (const o of report.overflow) {
    console.log(`        overflow ${o.tag} [${o.left}..${o.right}] :: ${o.cls}`);
  }
  for (const h of report.hidden) console.log(`        unrevealed ${h}`);
  await page.close();
}

await browser.close();
console.log(
  problems === 0
    ? '\nAll breakpoints clean.'
    : `\n${problems} breakpoint(s) with problems.`,
);
process.exit(problems === 0 ? 0 : 1);
