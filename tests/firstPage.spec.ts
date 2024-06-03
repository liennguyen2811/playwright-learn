import { test, expect } from '@playwright/test';
import { PageManager } from '../page-object/pageManager';
import {faker} from '@faker-js/faker'


test.beforeEach(async({page})=>{
    await page.goto('/');
});

test ('navigation to form layout',async ({page})=> {
    const pm = new PageManager(page)
    await pm.navigationTo().formlayoutsPage()
    await pm.navigationTo().datepickerPage()
    await pm.navigationTo().smartTablePage()
    await pm.navigationTo().tooltipPage()
    await pm.navigationTo().toastrPage()
});
test ('parameterized method',async ({page})=> {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName}${faker.number.int(100)}@test.com`
    await pm.navigationTo().formlayoutsPage();
    //await page.screenshot({path: 'sceenshot/formlayoutsPage.png'})
    await  pm.onFormLayoutPage().submitUsingGridFormWithCredentialAndSelectOption(randomFullName, '1234' ,'Option 1')
    await  pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await pm.navigationTo().datepickerPage()
    await pm.ondatePickerPage().selectCommonDatePickerDateFromToday(7)
    await pm.ondatePickerPage().selectDatePickerWithRangeFromToday(1,5)
});