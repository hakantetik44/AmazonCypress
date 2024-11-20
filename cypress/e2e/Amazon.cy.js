describe('Amazon E2E Testleri', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.amazon.com', {
            headers: {
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

    });

    it('Arama ve İlk Sonuca Tıklama', () => {
        cy.get('#twotabsearchtextbox')
            .should('be.visible')
            .type('iphone')
            .clear()
            .type('laptop{enter}');


        cy.get('[data-component-type="s-search-result"]')
            .first()
            .find('a.a-link-normal')
            .first()
            .click();


        cy.url().should('include', '/B0BPHQFLZX/');

    });

    it('Menü Kategorilerinde Gezinme', () => {
        cy.get('#nav-hamburger-menu')
            .should('be.visible')
            .click();
        cy.contains('.hmenu-item > div', 'Computers')
            .scrollIntoView()
            .should('be.visible')
            .click();
    });

    it('Alt Kategorilere Tıklama', () => {
        cy.get('#nav-hamburger-menu')
            .should('be.visible')
            .click();

        cy.wait(1000);


        cy.get('.hmenu-visible')
            .contains('Electronics')
            .should('be.visible')
            .click();

        cy.wait(1000);


        cy.get('.hmenu-visible')
            .contains('Headphones')
            .should('be.visible')
            .click({ force: true });
    });

    it('Kategori Seçimi ve Ürün Listeleme', () => {

        //odev
        cy.get('#searchDropdownBox')
            .select('search-alias=stripbooks', { force: true });


        cy.get('#twotabsearchtextbox')
            .type('crime and punishment{enter}');

        cy.wait(2000);


        cy.get('[data-component-type="s-search-result"]')
            .first()
            .scrollIntoView()
            .should('be.visible');
    });

    it.only('Header Menüsünü Kontrol Et', () => {
        cy.get('#nav-link-accountList')
            .should('be.visible')
            .trigger('mouseover');

        cy.wait(1000);

        cy.get('#nav-al-container')
            .should('be.visible');
    });

    it('Wishlist İşlemleri', () => {
        // Ürün arama
        cy.get('#twotabsearchtextbox')
            .clear()
            .type('wireless mouse{enter}');

        cy.wait(3000);


        cy.get('[data-component-type="s-search-result"]')
            .first()
            .find('h2 a')
            .click();


        cy.get('#add-to-cart-button')
            .should('be.visible')
            .click({ force: true });
    });

    it('Ürün Detaylarını Kontrol Etme', () => {
        cy.get('#twotabsearchtextbox')
            .type('keyboard{enter}');

        cy.wait(2000);

        cy.get('[data-component-type="s-search-result"]')
            .first()
            .find('h2 a')
            .click();

        cy.get('#productTitle')
            .should('be.visible');
    });

    after(() => {
        cy.writeFile('cypress/logs/test-results.log', 'Amazon E2E Testleri tamamlandı.\n', { flag: 'a+' });
        cy.log('Test sonrası işlemler tamamlandı.');
    });
});