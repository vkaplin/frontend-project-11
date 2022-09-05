const { test, expect } = require('@playwright/test');

test('test app', async ({page}) => {

  await page.goto('https://frontend-project-11-vkaplin.vercel.app');
  const btnSubmit = await page.locator('button[type="submit"]');
  const form = await page.locator()
  const feedback = await page.locator('p.feedback');
  const input = await page.locator('input#url-input');

  expect(await input.evaluate(node => node.value)).toEqual('');
  expect(await feedback.evaluate(node => node.textContent)).toEqual('');
  
  await input.fill('https://ru.hexlet.io/lessons.rss1');
  await btnSubmit.click();
  await btnSubmit.click();
  console.log(await feedback.evaluate(node => node.innerText))
  expect(await feedback.evaluate(node => node.textContent)).toEqual('Ресурс не содержит валидный RSS');

  await input.fill('https://ru.hexlet.io/lessons.rss');
  await btnSubmit.click();
  await btnSubmit.click();
  expect(await feedback.evaluate(node => node.textContent)).toEqual('RSS успешно загружен');
  expect(await input.evaluate(node => node.value)).toEqual('');

  await input.fill('https://ru.hexlet.io/lessons.rss');
  await btnSubmit.click();
  await btnSubmit.click();
  expect(await feedback.evaluate(node => node.textContent)).toEqual('RSS уже существует');

  await input.fill('https://www.nasa.gov/rss/dyn/educationnews.rss');
  await btnSubmit.click();
  await btnSubmit.click();
  expect(await feedback.evaluate(node => node.textContent)).toEqual('RSS успешно загружен');
  expect(await input.evaluate(node => node.value)).toEqual('');
  
  const btnView = page.locator('button[data-bs-toggle="modal"]')[0];
  console.log(await feedback.evaluate(node => node.innerText))
  console.log(await btnView.evaluate(node => node.innerText))
});