const { chromium } = require('playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({executablePath:EXEC, args:['--no-sandbox','--disable-dev-shm-usage']});
  // ---- theirs ----
  try{
    const p = await b.newPage({viewport:{width:1440,height:900}});
    await p.goto('https://halaniimmigration.com/', {waitUntil:'domcontentloaded', timeout:45000});
    await p.waitForTimeout(4000);
    for (let i=0;i<4;i++){
      await p.screenshot({path:`shots/halani-${i}.png`});
      await p.evaluate(()=>window.scrollBy(0, window.innerHeight*0.92));
      await p.waitForTimeout(900);
    }
    console.log('halani captured');
    await p.close();
  }catch(e){ console.log('halani FAILED:', String(e).slice(0,110)); }
  await b.close();
})();
