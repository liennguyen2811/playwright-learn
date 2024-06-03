import { expect, Page } from "@playwright/test";

export class HelperBase {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page;}

async waitForNumberOfSecond(timeOfSecond: number){
    await this.page.waitForTimeout(timeOfSecond*1000)
}

}