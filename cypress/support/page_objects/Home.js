import { onCart } from "./Cart"

export class Home {

  // Atributos
  featuredProducts = '.features_items .col-sm-4 .product-image-wrapper'
  modalContent = '.modal-content'

  // Getters
  getFeaturedProducts() {
    return cy.get(this.featuredProducts)
  }
  getModalContent(){
    return cy.get(this.modalContent)
  }

  /**
   * Agregar un item al carrito
   * Una vez agregado, va a la pagina del carrito mediante el modal
   * Extra el nombre del item del carrito y lo compara con la del producto agregado
   * @param {int} number 
   */
  addItemToCart(number){
    number -= 1

    this.getFeaturedProducts().eq(number).find('p').first().then($item => {
      let itemName = $item.text()

      this.getFeaturedProducts().eq(number).find('[class="productinfo text-center"] [class="btn btn-default add-to-cart"]').click()

      this.getModalContent().find('a').click()

      onCart.getCartItem().eq(1).find('.cart_description a').then($cartItem =>{
        let cartItem = $cartItem.text()
        
        this.compareItemNames(itemName, cartItem)
      })
    })
  }

  compareItemNames(name1, name2){
    expect(name1.trim()).to.equal(name2.trim())
  }
}

export const onHome = new Home()