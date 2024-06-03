import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL);
  await page.getByText("Button Triggering AJAX Request").click();
});

test("the way to set time out", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // set time out in config file or set like :
  await successButton.waitFor({ state: "attached" });
  // or set timeout like
  await expect(successButton).toHaveText("Data download with AJAX request", {
    timeout: 2000,
  });
});
test("alternative way to set time out", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // -- wait for element
  await page.waitForSelector(".bg-success");
  const text = successButton.allTextContents();
  expect(text).toContain("Data download with AJAX request");
});
test("TEST time out", async ({ page }) => {
  // config in define config
  // in define config --> use --> setting action time out and navigation timeout
  test.setTimeout(500); // overide
  test.slow;
  const successButton = page.locator(".bg-success");
  await successButton.click({ timeout: 500000 });
});
