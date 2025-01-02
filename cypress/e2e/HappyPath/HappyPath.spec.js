import { onHome } from "../../support/page_objects/Home";
import { navigateTo } from "../../support/page_objects/Navigate";
import { onProductReview } from "../../support/page_objects/ProductReview";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onSignupPage } from "../../support/page_objects/SignupPage";

describe("Happy path tests", () => {

  // DATOS DE PRUEBA COMUNES (HACERLOS DE ENVIRONMENT)
  const name = "Juan Jose Martinez"
  const email = "Jjmartinez@prueba.com"

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
  })

  it("2. Agregar un item a el carrito", () => {
    // Datos de prueba
    // Longitud actual de la lista de items es de 34, al 27/12/2024
    const number = 2

    // Pasos
    onHome.addItemToCart(number)

  })

  it.only("3. Dejar una review en un producto", () => {
    // Datos de pruebas
    const productItem = 3
    const review = "This is a test review"

    onHome.goToItemPage(productItem)
    onProductReview.leaveReview(name, email, review)
    onProductReview.getReviewModal().should('exist')
  })

})