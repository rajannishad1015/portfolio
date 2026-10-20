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

    // The portrait caption carries the one instruction that matters, so no
    // floating card may sit on top of it.
    const caption = Array.from(document.querySelectorAll('p')).find((p) =>
      (p.textContent ?? '').includes('Portrait PNG goes here'),
    );
    const covered = [];
    if (caption) {
      const c = caption.getBoundingClientRect();
      for (const el of Array.from(document.querySelectorAll('div'))) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const overlaps =
          r.left < c.right && r.right > c.left && r.top < c.bottom && r.bottom > c.top;
        if (!overlaps) continue;
        if (caption.contains(el) || el.contains(caption)) continue;
        const text = (el.textContent ?? '').trim();
        if (text && text.length < 40) {
          covered.push(text);
        }
      }
    }

    return {
      vw,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: overflow.slice(0, 8),
      hidden,
      covered,
    };
  });

  const bad =
    report.scrollWidth > report.vw ||
    report.overflow.length ||
    report.hidden.length ||
    report.covered.length;
  if (bad) problems += 1;
  console.log(
    `${bad ? 'FAIL' : 'ok  '} ${String(width).padStart(4)}px  client=${report.vw} scroll=${report.scrollWidth}`,
  );
  for (const o of report.overflow) {
    console.log(`        overflow ${o.tag} [${o.left}..${o.right}] :: ${o.cls}`);
  }
  for (const h of report.hidden) console.log(`        unrevealed ${h}`);
  for (const c of report.covered) {
    console.log(`        portrait caption covered by "${c}"`);
  }
  await page.close();
}

// The mobile menu must fill the viewport even when the page is scrolled —
// the header's backdrop-filter must never become its containing block.
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(() => {
    document.querySelector('button[aria-controls="mobile-menu"]')?.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const menu = await page.evaluate(() => {
    const el = document.getElementById('mobile-menu');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { width: Math.round(r.width), height: Math.round(r.height) };
  });

  const okMenu = menu && menu.width === 390 && menu.height === 844;
  if (!okMenu) problems += 1;
  console.log(
    `${okMenu ? 'ok  ' : 'FAIL'} mobile menu overlay ${JSON.stringify(menu)} (expected 390x844)`,
  );
  await page.close();
}

await browser.close();
console.log(
  problems === 0
    ? '\nAll breakpoints clean.'
    : `\n${problems} breakpoint(s) with problems.`,
);
process.exit(problems === 0 ? 0 : 1);
