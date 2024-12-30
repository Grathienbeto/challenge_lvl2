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

        expect(itemName.trim()).to.equal(cartItem.trim())
      })
    })
  }

  /**
   * Verifica que las tarjetas de los productos tengan 
   * las mismas dimensiones
   */
  checkIfAllCardsHaveSameDimensions(number=0, height=0, width=0){
    let expectedHeight = 0 || height
    let expectedWidth = 0 || width

    this.getFeaturedProducts().eq(number).then($element => {

      if (number == 0) {
        expectedHeight = $element.height()
        expectedWidth = $element.width()
        console.log(expectedHeight)
        console.log(expectedWidth)
      }

      else {
        expect($element.height()).to.equal(expectedHeight)
        expect($element.width()).to.equal(expectedWidth)
      } 

      number++
      this.checkIfAllCardsHaveSameDimensions(number, expectedHeight, expectedWidth)
    })
  }
  
}

export const onHome = new Home()