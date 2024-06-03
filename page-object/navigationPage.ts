import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class NavigationPage extends HelperBase{

  readonly formlayoutMenuItem : Locator
  readonly datepickerMenuItem : Locator
  readonly smarttableMenuItem : Locator
  readonly toastrMenuItem : Locator
  readonly tooltipLayoutMenuItem : Locator

  constructor(page: Page) {
    super(page)
    //this.page = page;
    this.formlayoutMenuItem = page.getByText("Form Layouts")
    this.datepickerMenuItem = page.getByText("Datepicker")
    this.smarttableMenuItem = page.getByText("Smart Table")
    this.toastrMenuItem = page.getByText("Toastr")
    this.tooltipLayoutMenuItem = page.getByText("Tooltip")
  }
  async formlayoutsPage() {
    await this.seleGroupMennuItem("Forms");
    await this.formlayoutMenuItem.click();
    await this.waitForNumberOfSecond(1);
  }
  async datepickerPage() {
    await this.seleGroupMennuItem("Forms");
    await this.datepickerMenuItem.click();
  }
  async smartTablePage() {
    await this.seleGroupMennuItem("Tables & Data");
    await this.smarttableMenuItem.click();
  }
  async toastrPage() {
    await this.seleGroupMennuItem("Modal & Overlays");
    await this.toastrMenuItem.click();
  }
  async tooltipPage() {
    await this.seleGroupMennuItem("Modal & Overlays")
    await this.tooltipLayoutMenuItem.click();
  }
  private async seleGroupMennuItem(groupItemtitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemtitle);
    const expended = await groupMenuItem.getAttribute("aria-expanded");
    if (expended == "false") {
      groupMenuItem.click();
    }
  }
}
