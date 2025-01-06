import { navigateTo } from "../../support/page_objects/Navigate";
import { onHome } from "../../support/page_objects/Home";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onSignupPage } from "../../support/page_objects/SignupPage";
import { onCart } from "../../support/page_objects/Cart";

describe("Happy path tests", () => {

  // DATOS DE PRUEBA COMUNES (HACERLOS DE ENVIRONMENT) usados de momento en 1 y 3
  let random = Math.floor(Math.random() * 99999)
  const name = `usuario prueba ${random}`
  const email = `usuario${random}@prueba.com`
  const cuenta = "usuario36939@prueba.com"
  const password = '1234567password'
  
  beforeEach("Ir a la pagina", () => {
    cy.visitApp();
  });

  it("1. Crear cuenta de usuario", () => {
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.newUserSignUp(name, email)
    
    // Assertions
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/signup");
    });
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
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/account_created");
    });
    
  })

  it("2. Agregar un item al carrito", () => {
    // Datos de prueba
    // Longitud actual de la lista de items es de 34, al 27/12/2024
    const number = 2

    // Pasos
    onHome.addItemToCart(number)

  })

  it("3. Dejar una review en un producto", () => {
    // Datos de pruebas
    const productItem = 3
    const review = "This is a test review"

    // Pasos
    onHome.goToItemPage(productItem)
    onProductReview.leaveReview(name, email, review)

    // Assertions
    onProductReview.getReviewModal().should('exist')
    // agregar assertion sobre el texto
  })

  it("4. Loguear con una cuenta ya creada y datos correctos", () => {

    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, password)

    onHome.getNavbar().should('contain', 'Logged in as usuario prueba 36939')
  })

  it("5. Vaciar el carrito de compras", () => {
    
    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.login(cuenta, password)
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

})