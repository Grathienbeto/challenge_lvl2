import { navigateTo } from "../../support/page_objects/Navigate";
import { onSignupLoginPage } from "../../support/page_objects/SignupLoginPage";
import { onSignupPage } from "../../support/page_objects/SignupPage";

describe("Happy path tests", () => {

  beforeEach("Ir a la pagina", () => {
    cy.visitApp();
  });

  it("1. Crear cuenta de usuario", () => {
    // Datos de pruebas
    let name = "Juan Jose Martinez"
    let email = "Jjmartinez@prueba.com"

    // Pasos
    navigateTo.signupLoginPage()
    onSignupLoginPage.newUserSignUp(name, email)
    
    // Assertions
    onSignupPage.getName().then(input => {
      cy.wrap(input[0].value).should('be.equal', name)
    })
    onSignupPage.getEmail().then(input => {
      cy.wrap(input[0].value).should('be.equal', email)
    })
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/signup");
    });
  })

})