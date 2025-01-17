import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:4200/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    extraHTTPHeaders: { 'Authorization': `Token ${process.env.ACCESS_TOKEN}` },
  },

  /* Configure projects for major browsers */
  projects: [
    
    { name: "setup", testMatch: "auth.setup.ts" },
    { name: "mobile", testMatch: "testMobile.spec.ts" , use: {...devices['iPhone 13 Pro']}},
    { name: "articleCleanUp", testMatch: "articleCleanUp.spec.ts" },
    {
      name: "articleSetup",
      testMatch: "newArticle.setup.ts",
      dependencies: ["setup"],
      teardown: "articleCleanUp"
    },
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:42001/" },
    },
    {
      name: "likecountesting",
      testMatch: "likecounts.spec.ts",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["articleSetup"],
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
  webServer:  {
    command : " npm run start",
    url : "http://localhost:4200/"

  }

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
