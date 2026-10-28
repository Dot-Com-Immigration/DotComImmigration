const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox','--disable-dev-shm-usage']});
  for (const [name, w, h] of [['desktop',1440,900],['mobile',390,844]]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
    const errs = [];
    p.on('console', m => { if (m.type()==='error') errs.push(m.text().slice(0,120)); });
    p.on('pageerror', e => errs.push('PAGEERROR: '+String(e).slice(0,160)));
    await p.goto('file://' + __dirname + '/index.html', { waitUntil:'load' });
    await p.waitForTimeout(2500);
    // horizontal overflow check
    const ov = await p.evaluate(() => ({
      docW: document.documentElement.scrollWidth,
      winW: window.innerWidth,
      wide: [...document.querySelectorAll('body *')]
        .filter(el => el.getBoundingClientRect().right > window.innerWidth + 2)
        .slice(0,6).map(el => (el.tagName+'.'+(el.className||'').toString().slice(0,34)))
    }));
    console.log(`\n--- ${name} ${w}x${h} ---`);
    console.log('scrollWidth', ov.docW, 'vs viewport', ov.winW, ov.docW > ov.winW+2 ? 'OVERFLOW' : 'ok');
    if (ov.wide.length) console.log('overflowing:', ov.wide.join(' | '));
    if (errs.length) console.log('console errors:', [...new Set(errs)].slice(0,5).join(' | '));
    await p.screenshot({ path:`shots/${name}-full.png`, fullPage:true });
    await p.close();
  }
  await b.close();
})();
