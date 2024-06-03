import { expect, test as setup } from "@playwright/test";

setup("delete", async ({ page, request }) => {
    console.log("slugID   " + process.env.SLUGID )
    const deleteArticalResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`,{
        headers: {
          Authorization : `Token ${process.env.ACCESS_TOKEN}`
        }
      })
      expect(deleteArticalResponse.status()).toEqual(204)
});