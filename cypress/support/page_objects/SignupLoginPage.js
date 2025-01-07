export class SignupLoginPage {
  // Atributos
  newUserNameInput = '[data-qa="signup-name"]'
  newUserEmailInput = '[data-qa="signup-email"]'
  newUserSignupBtn = '[data-qa="signup-button"]'
  loginEmailInput = '[data-qa="login-email"]'
  passwordInput = '[data-qa="login-password"]'
  loginBtn = '[data-qa="login-button"]'
  errorMessage = '[class="login-form"] p'

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
  getLoginEmailInput() {
    return cy.get(this.loginEmailInput)
  }
  getPasswordInput(){
    return cy.get(this.passwordInput)
  }
  getLoginBtn() {
    return cy.get(this.loginBtn)
  }
  getErrorMesssage() {
    return cy.get(this.errorMessage)
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

  /**
  * Loguea en una cuenta
  * @param {str} email 
  * @param {str} password 
  */
  login(email, password) {
    this.getLoginEmailInput().type(email)
    this.getPasswordInput().type(password)
    this.getLoginBtn().click()
  }
}

export const onSignupLoginPage = new SignupLoginPage()