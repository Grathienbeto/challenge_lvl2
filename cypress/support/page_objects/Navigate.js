export class Navigate {
  // Atributos
  home = '[class="fa fa-home"]'
  signupLoginLink = '[class="fa fa-lock"]'

  // Getters
  gethome(){
    return cy.get(this.home)
  }
  getSingupLoginLink() {
    return cy.get(this.signupLoginLink)
  }

  // Metodos
  homePage(){
    this.gethome().click()
  }

  signupLoginPage() {
    this.getSingupLoginLink().click()
  }
}

export const navigateTo = new Navigate();