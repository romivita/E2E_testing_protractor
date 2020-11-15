import { browser } from 'protractor';
import { SearchPage } from '../../pages/searchPage.po';

describe('User search', function () {
    let SearchPg: SearchPage;

    beforeAll(function () {
        SearchPg = new SearchPage();
        browser.waitForAngularEnabled(false);
        SearchPg.navigateTo('/');
        SearchPg.accederALegoCom();
        SearchPg.aceptarCookies();
    });

    it('Edad/3-5/Llaveros/0 € - 20 € should list 3 products', function () {
        SearchPg.clickOnShopBy();
        SearchPg.goTo3a5años("Edad", "3-5");
        SearchPg.filterTipoDeProducto("Llaveros");
        SearchPg.filterPrecio();
        SearchPg.products().then(function (items) {
            expect(items.length).toBe(3);
            expect(items[0].getText()).toBe('Llavero con linterna de Darth Vader™ LEGO® Star Wars™');
            expect(items[1].getText()).toBe('Llavero con luz de Stormtrooper™ LEGO® Star Wars™');
            expect(items[2].getText()).toBe('Llavero con luz de ladrillo 1x2 LEGO® (Rojo)');
        });
    })

    it('Ludo lego should redirect to the suggestion page', function () {
        SearchPg.navigateTo('/');
        SearchPg.searchInput("Ludo lego");
        SearchPg.searchSuggestions();
        expect(browser.getCurrentUrl()).toContain("search?q=Ludo%20LEGO%C2%AE&suggestion=true");
        SearchPg.addItemToBag(0);
        SearchPg.addItemToBag(1);
        SearchPg.scrollUp();
        SearchPg.clickOnMyBag();
        SearchPg.clickOnTramitarPedido();
        expect(SearchPg.importeTotal().getText()).toBe("399,98 €");
    });
})