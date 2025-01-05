import { onCart } from "../../support/page_objects/Cart";
import { onHome } from "../../support/page_objects/Home";
import { navigateTo } from "../../support/page_objects/Navigate";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onProductsPage } from "../../support/page_objects/ProductsPage";

describe("UnHappy path tests", () => {

  beforeEach("Ir a la pagina", () => {
    cy.visitApp();
  });

  it("11. Todas las tarjetas de productos destacados tengan mismo tamaño", () => {
    onHome.checkIfAllCardsHaveSameDimensions()
  })

  it('12. Agregar cantidades negativas de un producot, desde la pagina del producto', () => {
    // Pasos
    onHome.goToItemPage(1)
    onProductReview.addItemToCart(-1)
    onProductReview.getModalContent().find('a').click()

    // Assertion
    onCart.getCartItem().eq(1).find('[class="cart_quantity"] [class="disabled"]').then(element => {
      expect(element.text().trim()).to.not.equal('-1')      
    })
  })

  it.only('13. Encontrar productos usando el buscador.', () => {
    let product = 'dress'

    navigateTo.productsPage()
    onProductsPage.searchProducts(product)

    cy.wait(500)

    onProductsPage.getFeaturedItems().find('[class="col-sm-4"]').each($product => {
      cy.wrap($product).find('p').first().then($tag => {
        let itemText = $tag.text().trim()
        expect(itemText.toLowerCase()).to.contain(product)
      })
    })
    
    
  })

})