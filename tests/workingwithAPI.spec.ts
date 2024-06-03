import { test, expect,request } from "@playwright/test";
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
  await page.route( '*/**/api/tags', async route => {
      await route.fulfill({
        body: JSON.stringify(tags)
      })
    })
  await page.goto("https://conduit.bondaracademy.com/");
  // await page.getByText('Sign in').click()
  // await page.getByRole('textbox', {name : "Email"}).fill('liennguyen2811@gmail.com')
  // await page.getByRole('textbox', {name : "Password"}).fill('123456')
  // await page.getByRole('button').click()
  
});

test("has title conduit", async ({ page }) => {

  await page.route('*/**/api/articles*' , async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
     responseBody.articles[0].title = "this is mock test title"
     responseBody.articles[0].descriptioon = "  this is mock description test"

     await console.log("lien" + responseBody.articles[0].descriptioon );     
     await route.fulfill({
      body: JSON.stringify(responseBody)
     })
     await console.log("lien1" + responseBody.articles[0].descriptioon ); 
  })

  await page.getByText('Global Feed').click()
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator('app-article-list h1').first()).toContainText("this is mock test title");
  //await expect(page.locator('app-article-list p').first()).toContainText("this is mock description test");
  
});

test("delete articles", async ({ page,request }) => {
  // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
  //   data: {
  //     "user":{"email":"liennguyen2811@gmail.com","password":"123456"}
  //   }
  // })
  // const responseBody = await response.json()
  // const accessToken = responseBody.user.token

  const articleResult = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article":{"title":"this is title","description":"this is description","body":"this is content","tagList":[]}
    },
    // headers: {
    //   Authorization : `Token ${accessToken}`
    // }
  });
  expect(articleResult.status()).toEqual(201)
  await page.getByText('Global Feed').click() 
  await page.getByText('this is title').click()
  await page.getByRole('button', {name: "Delete Article"}).first().click()
  await page.getByText('Global Feed').click()
  
  await expect(page.locator('app-article-list h1').first()).not.toContainText("this is title");
  await expect(page.locator('app-article-list p').first()).not.toContainText("this is description");

})

test("create articles by ui", async ({ page,request }) => {

  await page.getByText(' New Article ').click()
  // await page.locator('.ion-compose').dblclick()
  // await page.getByText('Settings').click()
  // await page.getByText('Your Feed').click()
  // await page.getByText('Global Feed').click()

  // await page.getByText(' New Article ').click()


  await page.getByRole('textbox', {name: 'Article Title'}).fill('Plightwright is awesome')
  await page.getByRole('textbox', {name : 'What\'s this article about?'}).fill('About Playwright')
  await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('Plightwright automation')
  await page.getByRole('button', {name: ' Publish Article '}).click()
  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleBody = await articleResponse.json()
  console.log(articleBody) + "  article"
  const slugID = articleBody.article.slug

  await expect(page.locator('.article-page h1')).toContainText("Plightwright is awesome");
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText("Plightwright is awesome"); 

  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data: {
      "user":{"email":"liennguyen2811@gmail.com","password":"123456"}
    }
  })
  const responseBody = await response.json()
  const accessToken = responseBody.user.token

  const deleteArticalResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`,{
    headers: {
      Authorization : `Token ${accessToken}`
    }
  })
  expect(deleteArticalResponse.status()).toEqual(204)
  


})
