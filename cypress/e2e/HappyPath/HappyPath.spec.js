import { navigateTo } from "../../support/page_objects/Navigate";
import { onHome } from "../../support/page_objects/Home";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onSignupPage } from "../../support/page_objects/SignupPage";
import { onCart } from "../../support/page_objects/Cart";

describe("Happy path tests", () => {

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

  it("1. Crear cuenta de usuario", () => {
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.newUserSignUp(name, email)
    
    // Assertion
    navigateTo.checkCorrectPage("signup")

    onSignupPage.getName().then(input => {
      cy.wrap(input[0].value).should('be.equal', name)
    })    
    onSignupPage.getEmail().then(input => {
      cy.wrap(input[0].value).should('be.equal', email)
    })

    // Completar cuenta usuario
    onSignupPage.getPassword().type('1234567password')
    onSignupPage.getDay().select(1)
    onSignupPage.getMonth().select(5)
    onSignupPage.getYear().select(22)
    onSignupPage.getFirstName().type("Juan Jose")
    onSignupPage.getLastName().type("Martinez")
    onSignupPage.getCompany().type('Pi Consulting')
    onSignupPage.getAdress().type('Calle Falsa 123')
    onSignupPage.getCountry().select(6)
    onSignupPage.getState().type("Hobbiton State")
    onSignupPage.getCity().type("Bag End City")
    onSignupPage.getZip().type('X1234')
    onSignupPage.getMobile().type('0303456')
    onSignupPage.getCreateBtn().click()

    // Assertions
    navigateTo.checkCorrectPage('account_created')
    cy.get('[data-qa="account-created"]').should('contain', "Account Created!")
    
  })

  it.only("2. Agregar un item al carrito", () => {
    // Longitud actual de la lista de items es de 34, al 27/12/2024
    // Datos
    const number = 2

    // Pasos
    onHome.addItemToCart(number)

  })

  it("3. Dejar una review en un producto", () => {
    // Datos
    const productItem = 3
    const review = "This is a test review"

    // Pasos
    onHome.goToItemPage(productItem)
    onProductReview.leaveReview(name, email, review)

    // Assertions
    onProductReview.getReviewModal().should('exist')
    onProductReview.getReviewModal().should('contain', 'Thank you for your review.')
  })

  it("4. Loguear con una cuenta ya creada y datos correctos", () => {
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, clave)

    // Assertion
    onHome.getNavbar().should('contain', 'Logged in as usuario prueba 85897')
  })

  it("5. Vaciar el carrito de compras", () => {
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, clave)
    onHome.addItemToCart(2, false)
    navigateTo.homePage()
    onHome.addItemToCart(4, false)
    navigateTo.homePage()
    onHome.addItemToCart(6, false)
    navigateTo.cartPage()
    onCart.emptyCart()
    cy.wait(500)

    // Assertions
    onCart.getEmptySpan().should('exist')
    onCart.getEmptySpan().should('contain', 'Cart is empty! Click here to buy products.')
  })

  it("6. Log Out", () => {
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, clave)
    onHome.getNavbar().should('contain', 'Logged in as usuario prueba 85897')

    // Assertion
    onHome.getLogout().should('exist')
    
    onHome.getLogout().click()

    // Assertion
    cy.wait(1000)
    onHome.getNavbar().should('not.contain', 'Logged in as usuario prueba 85897')
    onHome.getNavbar().should('not.contain', 'Logout')
  })

  it("7. Test de navegacion de items del nav-bar", () => {
    // Pasos y Assertions
    navigateTo.productsPage()
    navigateTo.checkCorrectPage('products')

    navigateTo.cartPage()
    navigateTo.checkCorrectPage('view_cart')

    navigateTo.signupLoginPage()
    navigateTo.checkCorrectPage('login')

    navigateTo.contactPage()
    navigateTo.checkCorrectPage('contact_us')
  })

  // Ultimos tres casos sacados de los tests de API de la pagina AutomationExcercice.
  it("8. API 7: POST To Verify Login with valid details", () => {
    // Pasos
    cy.request({
      method: 'POST',
      url: `${apiUrl}/verifyLogin`,
      form: true,
      body: {
        email: cuenta,
        password: clave
      }
    }).then(
      (response) => {
        const responseBody = JSON.parse(response.body)
        // Assertion
        expect(responseBody.responseCode).to.equal(200)
        expect(responseBody.message).to.equal("User exists!")
      }
    )
  })

  it("9. API 5: POST To Search Product", () => {
    // Pasos
    cy.request({
      method: 'POST',
      url: `${apiUrl}/searchProduct`,
      form: true,
      body: {
        search_product: 'dress'
      }
    })
    .then(response => {
      const responseBody = JSON.parse(response.body)
      // Assertion
      expect(responseBody.responseCode).to.equal(200)
      
      responseBody.products.forEach(elem => {
        expect(elem.category.category).to.equal('Dress')
      })
    })
  })

  it("10. API 3: Get All Brands List", () => {
    // Pasos
    cy.request({
      method: "GET",
      url: `${apiUrl}/brandsList`
    })
    .then(response => {
      const responseBody = JSON.parse(response.body)
      // Assertion
      expect(responseBody.responseCode).to.equal(200)
      expect(responseBody.brands.length).to.equal(34)
    })
  })
})