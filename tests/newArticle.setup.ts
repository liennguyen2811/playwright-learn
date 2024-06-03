import { expect, test as setup } from "@playwright/test";

setup("create new article", async ({ page, request }) => {

    process.env.ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MjY5fSwiaWF0IjoxNzE2NzgzOTMxLCJleHAiOjE3MjE5Njc5MzF9.mSNr2flIvaTW-1lpZGlr2qbd_FlsLeaZqUjWTpctVeM'

    const articleResult = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
          "article":{"title":"this is title","description":"this is description","body":"this is content","tagList":[]}
        },
        headers: {
          Authorization : `Token ${process.env.ACCESS_TOKEN}`
        }
      });
      console.log("lien token create new article " + process.env.ACCESS_TOKEN) 
      
      expect(articleResult.status()).toBe(201)
      const response = await articleResult.json()
      const slugID = response.article.slug
      console.log("test slugID" + slugID)
      process.env['SLUGID'] = slugID
      console.log("process.env['SLUGID']" + process.env['SLUGID'])

      
});