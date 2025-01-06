import { navigateTo } from "../../support/page_objects/Navigate";
import { onHome } from "../../support/page_objects/Home";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onProductsPage } from "../../support/page_objects/ProductsPage";
import { onCart } from "../../support/page_objects/Cart";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";

describe("UnHappy path tests", () => {

  // DATOS DE PRUEBA COMUNES (HACERLOS DE ENVIRONMENT) usados de momento en 1 y 3
  let random = Math.floor(Math.random() * 99999)
  const name = `usuario prueba ${random}`
  const email = `usuario${random}@prueba.com`
  const cuenta = "usuario36939@prueba.com"
  const password = '1234567password'

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

  it('13. Encontrar productos usando el buscador', () => {
    let product = 'dress'

    // Pasos
    navigateTo.productsPage()
    onProductsPage.searchProducts(product)

    // Assertions
    onProductsPage.getFeaturedItems().find('[class="col-sm-4"]').each($product => {
      cy.wrap($product).find('p').first().then($tag => {
        let itemText = $tag.text().trim()
        expect(itemText.toLowerCase()).to.contain(product)
      })
    })
    
    
  })

  it('14. Agregar un metodo de pago invalido (fecha de vencimiento de tarjeta caducada)', () => {
    // Pasos
    /**
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, password)
    onHome.addItemToCart(2, false)
    onCart.getCheckoutBtn().click()
     */
  })

})