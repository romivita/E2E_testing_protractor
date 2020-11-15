import { browser, element, by, ExpectedConditions } from 'protractor';
import { BrowserUtil } from "../utils/browser.util";

/**
 * Class representing generic page.
 * Methods/properties for global elements should go here. 
 * 
 * @export
 * @class BasePage
 */
export class BasePage {
  constructor() { }

  continuarButton() {
    return element(by.xpath('.//*[@data-test=\'age-gate-grown-up-cta\']'));
  }

  aceptarCookiesButton() {
    return element(by.xpath('.//*[@data-test=\'cookie-banner-normal-button\']'));
  }

  navigateTo(relativeUrl: string) {
    browser.get(browser.params.baseUrl + relativeUrl);
  }

  public accederALegoCom() {
    BrowserUtil.waitUntilReady(this.continuarButton())
    this.continuarButton().click();
  }

  public aceptarCookies() {
    BrowserUtil.waitUntilReady(this.aceptarCookiesButton())
    this.aceptarCookiesButton().click();
  }
}
