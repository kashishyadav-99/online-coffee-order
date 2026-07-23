const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('file://' + __dirname + '/modern-menu.html', { waitUntil: 'networkidle0' });

  // Simulate clicking Buy Now on the first item
  await page.click('.buy-now-btn');
  
  // Fill the form
  await page.type('#buyName', 'Test User');
  await page.type('#buyMobile', '1234567890');
  await page.type('#buyEmail', 'test@test.com');
  await page.type('#buyAddress', '123 Test St');
  
  // Submit form to go to payment step
  await page.click('#continueToPaymentBtn');
  
  // Wait for payment modal
  await page.waitForSelector('#paymentModalOverlay', { visible: true });
  
  // Click Cash on Delivery
  await page.evaluate(() => {
    document.querySelector('.payment-option[data-method="Cash"]').click();
  });
  
  // Click Place Order
  await page.click('#placeOrderBtn');
  
  // Wait a bit for the fetch to happen
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Done testing flow.");
  await browser.close();
})();
