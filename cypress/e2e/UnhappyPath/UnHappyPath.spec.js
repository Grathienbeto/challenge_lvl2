import { navigateTo } from "../../support/page_objects/Navigate";
import { onHome } from "../../support/page_objects/Home";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onProductsPage } from "../../support/page_objects/ProductsPage";
import { onCart } from "../../support/page_objects/Cart";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onContact } from "../../support/page_objects/Contact";

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
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, password)
    onHome.addItemToCart(2, false)
    onCart.getCheckoutBtn().click()
    onCart.getPlaceOrderBtn().click()

    // Datos
    onCart.getNameOnCard().type(name)
    onCart.getCardNumber().type('1111222233334444')
    onCart.getCVC().type('000')
    onCart.getExpirationMonth().type('01')
    onCart.getExpirationYear().type('2023')
    onCart.getPayOrderBtn().click()

    // Assertions
    cy.wait(4000)
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.not.contain("/payment_done");
    });
    onCart.getOrderPlaced().should('not.contain', "ORDER PLACED!")
    onCart.getOrderPlaced().should('not.exist')
    
  })

  it("15. En 'Contact Us', intentar mandar un mensaje sin completar el formulario (Campo 'Email' vacio)", () => {
    navigateTo.contactPage()

    onContact.getName().type(name)
    onContact.getSubject().type("Caso de prueba")
    onContact.getMessage().type('Mensaje de prueba')
    onContact.getSubmitBtn().click()

    // Assert para validar que aparezca el popup default del browser
    // https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-check-that-a-forms-HTML-form-validation-is-shown-when-an-input-is-invalid
    onContact.getEmail().then(($input) => {
      expect($input[0].validationMessage).to.eq("Completa este campo");
    });
  })

  it("16. Loguear con cuenta correcta y contraseña incorrecta", () => {
    const email = Cypress.env("userAccount")

    navigateTo.signupLoginPage()
    onSignupLoginPage.login(email, 'passwordIncorrecta123')

    onSignupLoginPage.getErrorMesssage().should('exist')
    onSignupLoginPage.getErrorMesssage().should('contain', 'Your email or password is incorrect!')
  })

  it("17. Intentar comprar un producto sin estar logueado a la cuenta", () => {
    onHome.addItemToCart(2, false)
    onCart.getPlaceOrderBtn().click()

    onCart.getModalContent().find('p').last().should('contain', 'Register / Login')
  })

  it.only("18. API TESTING: POST To Verify Login with invalid details", () => {

  })
 
  it("19. API TESTING: POST To Search Product without search_product parameter", () => {
  })

  it("20. POST To Verify Login without email parameter", () => {
    
  })

})