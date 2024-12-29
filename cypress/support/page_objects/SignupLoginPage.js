export class SignupLoginPage {
  // Atributos
  newUserNameInput = '[data-qa="signup-name"]'
  newUserEmailInput = '[data-qa="signup-email"]'
  newUserSignupBtn = '[data-qa="signup-button"]'

  // Getters
  getNewUserNameInput() {
    return cy.get(this.newUserNameInput)
  }
  getNewUserEmailInput() {
    return cy.get(this.newUserEmailInput)
  }
  getNewUserSignupBtn() {
    return cy.get(this.newUserSignupBtn)
  }

  // Metodos
  
  /**
   * Crea una nueva cuenta de usuario
   * @param {string} name 
   * @param {string} email 
   */
  newUserSignUp(name, email) {
    this.getNewUserNameInput().type(name)
    this.getNewUserEmailInput().type(email)
    this.getNewUserSignupBtn().click()
  }
}

export const onSignupLoginPage = new SignupLoginPage()