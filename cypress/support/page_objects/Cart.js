export class Cart {

  // Atributos
  cartItem = '[id="cart_info_table"] tr'
  

  // Getters
  getCartItem() {
    return cy.get(this.cartItem)
  }

}

export const onCart = new Cart()