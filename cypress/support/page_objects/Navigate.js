export class Navigate {
  // Atributos
  signupLoginLink = '[class="fa fa-lock"]'

  // Getters
  getSingupLoginLink() {
    return cy.get(this.signupLoginLink)
  }

  // Metodos
  signupLoginPage() {
    this.getSingupLoginLink().click()
  }
}

export const navigateTo = new Navigate();