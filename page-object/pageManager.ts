import { expect, Page } from "@playwright/test";
import {NavigationPage} from '../page-object/navigationPage'
import {FormLayoutPage} from '../page-object/formlayoutPage'
import { DatePickerPage } from '../page-object/datepickerPage';

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formlayoutPage: FormLayoutPage
    private readonly datepickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formlayoutPage = new FormLayoutPage(this.page)
        this.datepickerPage = new DatePickerPage(this.page)

    }
    navigationTo (){
        return this.navigationPage
    }
    onFormLayoutPage(){
        return this.formlayoutPage
    }
    ondatePickerPage(){
        return this.datepickerPage
    }
    
    }