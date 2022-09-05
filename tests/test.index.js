const { test, expect } = require('@playwright/test');

test('test app', async ({page}) => {

  await page.goto('https://frontend-project-11-10mr6wq7g-vkaplin.vercel.app');
  const btnSubmit = await page.locator('button[type="submit"]');
  const form = await page.locator()
  const feedback = await page.locator('p.feedback');
  const input = await page.locator('input#url-input');

  expect(await input.evaluate(node => node.value)).toEqual('');

  await input.fill('https://ru.hexlet.io/lessons.rss1');
  await btnSubmit.click();
  console.log(await btnSubmit.evaluate(node => node.innerText))
 // expect(await input.evaluate(node => node.value)).toEqual('https://ru.hexlet.io/lessons.rss');
  console.log(await feedback.evaluate(node => node.innerText))
  //expect(await feedback.evaluate(node => node.textContent)).toEqual('Не должно быть пустым');

  console.log(await feedback.evaluate(node => node.innerText))
  //expect(await feedback.evaluate(node => node.textContent)).toEqual('Не должно быть пустым');
  
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))

    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))

    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    console.log(await feedback.evaluate(node => node.innerText))
    
});