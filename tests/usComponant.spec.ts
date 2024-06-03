import { test, expect } from '@playwright/test';

    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:4200/');
    });

    test.describe('input field and radiobutton learning',async ()=> {
        test.beforeEach(async({page})=>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        });

        test ('input field ',async ({page})=> {
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
        test ('radio buton ',async ({page})=> {
            const usingTheGrid = page.locator('nb-card', {hasText:"using the Grid"})
            await usingTheGrid.getByLabel( 'Option 1').check({force:true})
            await usingTheGrid.getByRole('radio', {name: "Option 1"}).check({force:true})
            const radioValue = await usingTheGrid.getByRole('radio', {name: "Option 1"}).isChecked()
            expect(radioValue).toBeTruthy()
            await expect(usingTheGrid.getByRole('radio', {name: "Option 1"})).toBeChecked();
            await usingTheGrid.getByRole('radio', {name: "Option 2"}).check({force:true})
            await expect(await usingTheGrid.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy();
            await expect(await usingTheGrid.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();

        });
    });
    test.describe('checkbox learning',async ()=> {
        test.beforeEach(async({page})=>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
        });
    test ('radio buton ',async ({page})=> {
        await page.getByRole('checkbox', {name : 'Hide on click'}).click({force: true})
        await page.getByRole('checkbox', {name : 'Hide on click'}).uncheck({force: true})
        await page.getByRole('checkbox', {name : 'Hide on click'}).check({force: true})
        await page.getByRole('checkbox', {name : 'Prevent arising of duplicate toast'}).check({force: true})

        const allCheckbox = await page.getByRole('checkbox')
        console.log(allCheckbox.all())
        for (const box of  await allCheckbox.all()){
        //     await box.check({force: true})
        //    expect(await box.isChecked()).toBeTruthy()
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()

        }
    });
    });
    test.describe('List and dropdown learning',async ()=> {
        test.beforeEach(async({page})=>{
        });

    test ('list and dropdown list ',async ({page})=> {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()
         //page.getByRole('list') // used when list has UL tag
         //page.getByRole('listitem') // used when list has LI tag
         //const optionList = page.getByRole('list').locator('nb-option')
         const optionList = page.locator('nb-option-list nb-option')
        //await expect(optionList).toHaveText(["Light","Dark", "Cosmic","Corporate"])
        await optionList.filter({hasText: 'Cosmic'}).click()
         const header = page.locator('nb-layout-header')
         await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
         await dropDownMenu.click()
         await optionList.filter({hasText: 'Light'}).click()
         await expect(header).toHaveCSS('background-color', 'rgb(255, 255, 255)')

        
         const colors = {
        "Light": "rgb(255, 255, 255)",
        "Cosmic": "rgb(50, 50, 89)",
        "Dark": "rgb(34, 43, 69)",
        "Corporate": "rgb(255, 255, 255)"
         }
         await dropDownMenu.click()
        for(const color in colors){   
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            await dropDownMenu.click()
        }
    });
   
    });
    test ('tooltip testing ',async ({page})=> {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click()

        const tooTipCard =  page.locator('nb-card', {hasText: "Tooltip Placements"})
        await tooTipCard.getByRole('button',{name: "Top"}).hover()

         page.getByRole('tooltip') // if you have role tooltip created
         const toolTip = await page.locator('nb-tooltip').textContent()
         expect(toolTip).toEqual('This is a tooltip')

    });
    test ('dialog testing ',async ({page})=> {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click()

        page.on('dialog' , dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr',{hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

    });
    test ('web table testing ',async ({page})=> {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click()

        //1. get row by any text on this row
        const targetRow = page.getByRole('row',{name: "jack@yandex.ru"})
        await targetRow.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('20')
        await page.locator('.nb-checkmark').click()

        // 2. get row by any value on this row
        page.locator('.ng2-smart-pagination-nav').getByText('2').click();
        const targetRowID = await page.getByRole('row',{name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowID.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('mail').fill('test@test')
        await page.locator('.nb-checkmark').click()
        await expect(targetRowID.locator('td').nth(5)).toHaveText('test@test')

        // 3. test filter of this table
        const ages = ["20","30", "40", "200"]
        for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
            for (let row of await ageRows.all())
                {
                    const cellValue = await row.locator('td').last().textContent()
                    if (age == "200"){
                        expect(await page.getByRole('table').textContent()).toContain('No data found')
                    } else {
                        expect(cellValue).toEqual(age)
                    }                       
                }
        }
    });
    test ('datepicker ',async ({page})=> {
        await page.getByText('Forms').click();
        await page.getByText('Datepicker').click() 
        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click();

        let date = new Date();
        date.setDate(date.getDate()+ 17)
        const expectedDay = date.getDate().toString();
        console.log("lien" + expectedDay)
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedFullYear = date.getFullYear();
        const dataToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedFullYear}`

        let calendarMonthandYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMothandYear = ` ${expectedMonthLong} ${expectedFullYear}`
        while(!calendarMonthandYear.includes(expectedMothandYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthandYear = await page.locator('nb-calendar-view-mode').textContent()

        }

        await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDay, {exact: true}).click()
        await expect(calendarInputField).toHaveValue(dataToAssert) 
       
    });
    test ('slider testing ',async ({page})=> {
        //1. Update attribute
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await tempGauge.evaluate(node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')

        })
        await tempGauge.click();

        //1. Update attribute
        const tempBox  = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()
        const box = await tempBox.boundingBox();
        const x = box.x + box.width/2
        const y = box.y + box.height/2
        await page.mouse.move(x,y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.down()
        await page.mouse.move(x+100, y )
        await page.mouse.move(x+100 , y + 100)
        await page.mouse.up()
        await page.mouse.move(x -100 , y )
        await page.mouse.move(x -100 , y + 100)
        await page.mouse.up()


    });
