const { firefox } = require('playwright');
const fs = require('fs');
const { getEnvironmentData } = require('worker_threads');
const threshold = 100;
const outputFilePath = 'page.html';
const url = 'https://myapps.paychex.com/landing_remote/login.do?lang=en'; 

(async () => {
    const browser = await firefox.launch({ headless: false }); 
    const page = await browser.newPage(); 
    await page.goto(url, { waitUntil: 'load' });
    const pageContent = await page.content();
    fs.writeFileSync(outputFilePath, pageContent, 'utf8');
    await page.waitForSelector('#login', { state: 'visible' });
    const iframeElement = await page.$('#login');
    const frame = await iframeElement.contentFrame();
    await frame.waitForSelector('#login-username', { visible: true });
    await frame.type('#login-username', 'user1'); // replace user1 with your real username
    const decodedPassword = atob('dGVzdAo='); // this is just the word "test" encoded in base64. need to update to real password encoded in base64
    await frame.type('#login-password', decodedPassword);
    await frame.waitForSelector('#login-button', { visible: true });
    await frame.click('#login-button')
})();
