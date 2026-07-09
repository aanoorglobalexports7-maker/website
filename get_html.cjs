const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://shipyon.in/', { waitUntil: 'networkidle0' });
  const html = await page.content();
  fs.writeFileSync('shipyon_rendered.html', html);
  await browser.close();
  console.log('Saved to shipyon_rendered.html');
})();
