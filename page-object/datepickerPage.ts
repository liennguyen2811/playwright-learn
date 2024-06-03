import { expect, Page } from "@playwright/test";

export class DatePickerPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page;}

async selectCommonDatePickerDateFromToday(numberOfDaysFromToday : number){  
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click();
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert) 
        
}
async selectDatePickerWithRangeFromToday(startDayFromToday : number, endDayFromToday : number){ 
    const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click();
        const dateToAssertStart = await this.selectDateInCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert) 

}
private async selectDateInCalendar(numberOfDaysFromToday : number){
    let date = new Date();
        date.setDate(date.getDate()+ numberOfDaysFromToday)
        const expectedDay = date.getDate().toString();
        console.log("lien" + expectedDay)
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedFullYear = date.getFullYear();
        const dataToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedFullYear}`
        let calendarMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMothandYear = ` ${expectedMonthLong} ${expectedFullYear}`
        while(!calendarMonthandYear.includes(expectedMothandYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()

        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay, {exact: true}).click()
        return dataToAssert
        
}

}