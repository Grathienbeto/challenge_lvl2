export class SignupPage {
  // Atributos
  name = '[data-qa="name"]'
  email = '[data-qa="email"]'

  // Getters
  getName() {
    return cy.get(this.name)
  }
  getEmail() {
    return cy.get(this.email)
  }

  // Metodos

}

export const onSignupPage = new SignupPage()