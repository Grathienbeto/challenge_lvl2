export class Cart {

  // Atributos
  cartItem = '[id="cart_info_table"] tr'
  checkoutBtn = '[class="btn btn-default check_out"]'
  cartItems = 'tbody'
  emptySpan = '[id="empty_cart"]'

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