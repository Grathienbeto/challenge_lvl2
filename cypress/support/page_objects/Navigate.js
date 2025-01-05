export class Navigate {
  // Atributos
  home = '[class="fa fa-home"]'
  products = '[class="material-icons card_travel"]'
  signupLoginLink = '[class="fa fa-lock"]'

  // Getters
  gethome(){
    return cy.get(this.home)
  }
  getSingupLoginLink() {
    return cy.get(this.signupLoginLink)
  }
  getProducts(){
    return cy.get(this.products)
  }

  // Metodos
  homePage(){
    this.gethome().click()
  }
  signupLoginPage() {
    this.getSingupLoginLink().click()
  }
  productsPage(){
    this.getProducts().click()
  }
}

export const navigateTo = new Navigate();