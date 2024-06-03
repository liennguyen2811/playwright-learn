import { test, expect,request } from "@playwright/test";

test("like counts increase", async ({ page }) => {
    console.log("process.env['SLUGID']" + process.env['SLUGID'])
    await page.goto("https://conduit.bondaracademy.com/")
    await page.getByText("Global Feed").click()
    await page.waitForTimeout(3000)
    const firstLikeButton =  page.locator("app-article-preview").first().locator("button")
    await expect(firstLikeButton).toContainText('0')
    await firstLikeButton.click();
    await expect(firstLikeButton).toContainText('1')
    

});