import { navigateTo } from "../../support/page_objects/Navigate";
import { onHome } from "../../support/page_objects/Home";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onProductsPage } from "../../support/page_objects/ProductsPage";
import { onCart } from "../../support/page_objects/Cart";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onContact } from "../../support/page_objects/Contact";

describe("UnHappy path tests", () => {

  // DATOS DE PRUEBA COMUNES
  const random = Math.floor(Math.random() * 99999) 
  const name = `usuario prueba ${random}`
  const email = `usuario${random}@prueba.com`

  const cuenta = Cypress.env("userAccount")
  const clave = Cypress.env("password")
  const apiUrl = Cypress.env("apiUrl")

  beforeEach("Ir a la pagina Home del sitio", () => {
    cy.visitApp();
  });

  it("11. Todas las tarjetas de productos destacados tengan mismo tamaño", () => {
    // Pasos
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
    // Datos
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
    onSignupLoginPage.login(cuenta, clave)
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
    // Pasos
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
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, 'passwordIncorrecta123')

    // Assertions
    onSignupLoginPage.getErrorMesssage().should('exist')
    onSignupLoginPage.getErrorMesssage().should('contain', 'Your email or password is incorrect!')
  })

  it("17. Intentar comprar un producto sin estar logueado a la cuenta", () => {
    // Pasos
    onHome.addItemToCart(2, false)
    onCart.getPlaceOrderBtn().click()

    // Assert
    onCart.getModalContent().find('p').last().should('contain', 'Register / Login')
  })

  // Ultimos tres casos sacados de los tests de API de la pagina AutomationExcercice.
  it("18. API 8: POST To Verify Login without email parameter", () => {
    // Pasos
    cy.request({
      method: 'POST',
      url: `${apiUrl}/verifyLogin`,
      form: true,
      body: {
        password: clave
      }
    }).then(
      (response) => {
        const responseBody = JSON.parse(response.body)

        // Assertions
        expect(responseBody.responseCode).to.equal(400)
        expect(responseBody.message).to.equal("Bad request, email or password parameter is missing in POST request.")
      }
    )
  })
 
  it("19. API 6: POST To Search Product without search_product parameter", () => {
    // Pasos
    cy.request({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
    })
    .then(response => {
      const responseBody = JSON.parse(response.body)
      // Assertions
      expect(responseBody.responseCode).to.equal(400)
      expect(responseBody.message).to.equal("Bad request, search_product parameter is missing in POST request.")  
    })
  })

  it("20. API 4: PUT To All Brands List", () => {
    // Pasos
    cy.request({
      method: "PUT",
      url: `${apiUrl}/brandsList`
    })
    .then(response => {
      const responseBody = JSON.parse(response.body)
      // Assertions
      expect(responseBody.responseCode).to.equal(405)
      expect(responseBody.message).to.equal('This request method is not supported.')
    })

  })

})