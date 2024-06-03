import { test, expect } from '@playwright/test';

    test.beforeEach(async({page})=>{
        await page.goto('/');
    });
    test ('input field ',async ({page},testInfo)=> {   
        
        
        if (testInfo.project.name === 'mobile'){

            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click();
        await page.locator('.sidebar-toggle').click()
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:"using the Grid"}).getByRole('textbox',{name:"email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 500})
        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')
        //location assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
        });
