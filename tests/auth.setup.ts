import { test as setup } from "@playwright/test";
import user from "../.auth/user.json";
import fs from "fs";

//const authFile = '.auth/user.json'
const authFile = ".auth/user.json";

setup("authentication", async ({ page, request }) => {
  // await page.goto("https://conduit.bondaracademy.com/");
  // await page.getByText("Sign in").click();
  // await page
  //   .getByRole("textbox", { name: "Email" })
  //   .fill("liennguyen2811@gmail.com");
  // await page.getByRole("textbox", { name: "Password" }).fill("123456");
  // await page.getByRole("button").click();
  // await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");
  // await page.locator(".navbar-brand").isVisible();
  // await page.context().storageState({ path: authFile });
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "liennguyen2811@gmail.com", password: "123456" },
      },
    }
  );
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;
  user.origins[0].localStorage[0].value = accessToken
  fs.writeFileSync(authFile,JSON.stringify(user))
  process.env['ACCESS_TOKEN'] = accessToken

  console.log("lien" + accessToken)
  console.log("lien  process.env['ACCESS_TOKEN']" +  process.env.ACCESS_TOKEN)
});
