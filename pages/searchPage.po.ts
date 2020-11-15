import { browser, element, by, ExpectedConditions } from 'protractor';
import { BasePage } from "./basePage.po";
import { BrowserUtil } from "../utils/browser.util";

/**
 * Class representing generic page.
 * Methods/properties for global elements should go here.
 *
 * @export
 * @class BasePage
 */
export class SearchPage extends BasePage {
    shopBy() {
        return element(by.xpath('.//span[text()=\'Comprar por\']'));
    }

    filterBy(filter: string) {
        return element(by.xpath('.//span[contains(text(),"' + filter + '")]'));
    }

    filterByPrecio() {
        return element(by.xpath('.//span[@data-test="checkbox-text"]'));
    }

    products() {
        return element.all(by.xpath('.//h2[@data-test=\'product-leaf-title\']'));
    }

    summaryList() {
        return element(by.xpath('.//div[@data-test="listing-summary"]/span'));
    }

    magnifyingGlass() {
        return element(by.xpath('.//header//div[2]/div/div/button'));
    }

    searchInputElem() {
        return element(by.id('desktop-search-search-input'));
    }

    searchSuggestionsElem() {
        return element.all(by.xpath('.//ul[@id="desktop-search-search-suggestions"]/li')).first();
    }

    fisrtSuggestion() {
        return element(by.xpath('.//a[@data-test="text-suggestion-link"]'));
    }

    addToBag() {
        return element.all(by.xpath('.//button[@data-test="product-leaf-cta-add-to-cart"]'));
    }

    myBag() {
        return element(by.xpath('.//a[@data-test="util-bar-cart"]'));
    }

    number() {
        return element(by.xpath('.//a[@data-test="util-bar-cart"]'));
    }

    betweenXandYHeader() {
        return element(by.xpath('.//h1/span'));
    }

    video() {
        return element(by.xpath('.//video'));
    }

    pagination() {
        return element(by.xpath('.//a[@data-test="pagination-page-1"]'));
    }

    accordion() {
        return element.all(by.xpath('.//button[@data-test="accordion-title"]'));
    }

    toastHeader() {
        return element(by.xpath('.//div[@data-test="toast-header-container"]'));
    }

    checkoutUrl() {
        return element(by.xpath('.//a[@href="/es-es/checkout"]'));
    }

    checkoutPage() {
        return element(by.xpath('.//div[@role="main"]'));
    }

    importeTotal() {
        return element(by.xpath('.//div[3]/span[2]'));
    }

    public searchInput(product: string) {
        BrowserUtil.waitUntilReady(this.magnifyingGlass())
        this.magnifyingGlass().click();
        this.searchInputElem().sendKeys(product);
    }

    public searchSuggestions() {
        BrowserUtil.waitUntilReady(this.searchSuggestionsElem())
        this.searchSuggestionsElem().click();
    }

    public addItemToBag(id: number) {
        BrowserUtil.waitUntilReady(this.addToBag().get(id))
        this.addToBag().get(id).click();
        BrowserUtil.waitUntilReady(this.toastHeader())
        BrowserUtil.waitUntilNotInDom(this.toastHeader())
    }

    public scrollUp() {
        browser.executeScript('window.scrollTo(0,0);');
    }

    public clickOnMyBag() {
        BrowserUtil.waitUntilReady(this.myBag())
        this.myBag().click();
    }

    public clickOnShopBy() {
        BrowserUtil.waitUntilReady(this.shopBy())
        this.shopBy().click();
    }

    public async goTo3a5años(edad: string, betweenXandY: string) {
        BrowserUtil.waitUntilReady(this.filterBy(edad))
        this.filterBy(edad).click();
        await this.filterBy(betweenXandY).click();
        browser.wait(
            ExpectedConditions.textToBePresentInElement(this.betweenXandYHeader(), '3-5 años'),
            2000
        )
    }

    public filterTipoDeProducto(filter: string) {
        //BrowserUtil.waitUntilReady(this.video())
        BrowserUtil.waitUntilReady(this.filterBy(filter))
        this.filterBy(filter).click();
        BrowserUtil.waitUntilReady(this.addToBag().first())
    }

    public hideFilterTipoDeProducto() {
        this.accordion().first().click();
    }

    public filterPrecio() {
        this.hideFilterTipoDeProducto();
        BrowserUtil.waitUntilReady(this.filterByPrecio())
        this.filterByPrecio().click();
        BrowserUtil.waitUntilReady(this.addToBag().first())
    }

    public clickOnTramitarPedido() {
        BrowserUtil.waitUntilReady(this.checkoutUrl())
        this.checkoutUrl().click();
        BrowserUtil.waitUntilReady(this.importeTotal())
    }

}