import { Locator, Page } from "@playwright/test";

export class FormLayoutPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page;}

    async submitUsingGridFormWithCredentialAndSelectOption(email : string , password : string, optionText : string){
        const usingTheGrid = this.page.locator('nb-card', {hasText:"using the Grid"})
        await usingTheGrid.getByRole('textbox',{name:"email"}).fill(email)
        await usingTheGrid.getByRole('textbox',{name:"password"}).fill(password)
        await this.page.getByRole('radio', {name : optionText}).check({force: true})
        await usingTheGrid.getByRole('button').click()

    }
    async submitInlineFormWithNameEmailAndCheckbox(name : string , email : string, rememberMe : boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name : "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name : "Email"}).fill(email)
        if(rememberMe){
            await inlineForm.getByRole('checkbox').check({force: true})
            await inlineForm.getByRole('button').click()
        }

    }

}