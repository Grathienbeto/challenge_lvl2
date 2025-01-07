export class Navigate {
  // Atributos
  home = '[class="fa fa-home"]'
  cart = 'ul.nav.navbar-nav [class="fa fa-shopping-cart"]'
  products = '[class="material-icons card_travel"]'
  signupLoginLink = '[class="fa fa-lock"]'
  contact = '[class="fa fa-envelope"]'

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
  getContact(){
    return cy.get(this.contact)
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
  contactPage(){
    this.getContact().click()
  }

  checkCorrectPage(url){
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain(`/${url}`);
    });
  }
}

export const navigateTo = new Navigate();