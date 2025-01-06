export class Navigate {
  // Atributos
  home = '[class="fa fa-home"]'
  cart = 'ul.nav.navbar-nav [class="fa fa-shopping-cart"]'
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
  getCart(){
    return cy.get(this.cart)
  }

  // Metodos
  homePage(){
    this.gethome().click()
  }
  cartPage(){
    this.getCart().click()
  }
  signupLoginPage() {
    this.getSingupLoginLink().click()
  }
  productsPage(){
    this.getProducts().click()
  }
}

export const navigateTo = new Navigate();