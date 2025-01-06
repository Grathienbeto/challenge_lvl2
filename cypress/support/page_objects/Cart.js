export class Cart {

  // Atributos
  cartItem = '[id="cart_info_table"] tr'
  checkoutBtn = '[class="col-sm-6"] [class="btn btn-default check_out"]'
  cartItems = 'tbody'
  emptySpan = '[id="empty_cart"]'

  placeOrderBtn = '[class="btn btn-default check_out"]'

  nameOnCard = '[data-qa="name-on-card"]'
  cardNumber = '[data-qa="card-number"]'
  cvc = '[data-qa="cvc"]'
  expirationMonth = '[data-qa="expiry-month"]'
  expirationYear = '[data-qa="expiry-year"]'
  payOrderBtn = '[data-qa="pay-button"]'
  orderPlaced = '[data-qa="order-placed"]'

  // Getters
  getCartItem() {
    return cy.get(this.cartItem)
  }
  getCheckoutBtn() {
    return cy.get(this.checkoutBtn)
  }
  getCartItems() {
    return cy.get(this.cartItems)
  }
  getEmptySpan() {
    return cy.get(this.emptySpan)
  }
  getPlaceOrderBtn() {
    return cy.get(this.placeOrderBtn)
  }
  getNameOnCard() {
    return cy.get(this.nameOnCard)
  }
  getCardNumber() {
    return cy.get(this.cardNumber)
  }
  getCVC() {
    return cy.get(this.cvc)
  }
  getExpirationMonth() {
    return cy.get(this.expirationMonth)
  }
  getExpirationYear() {
    return cy.get(this.expirationYear)
  }
  getPayOrderBtn() {
    return cy.get(this.payOrderBtn)
  }
  getOrderPlaced() {
    return cy.get(this.orderPlaced)
  }

  // Metodos
  /**
   * Vacia el carrito de compras
   */
  emptyCart(){
    this.getCartItems().find('[class="fa fa-times"]').each($deleteBtn => {
      cy.wrap($deleteBtn).click()
    })
  }
}

export const onCart = new Cart()