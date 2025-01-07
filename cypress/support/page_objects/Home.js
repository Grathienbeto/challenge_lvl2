import { onCart } from "./Cart"

export class Home {
  // Atributos
  featuredProducts = '.features_items .col-sm-4 .product-image-wrapper'
  modalContent = '.modal-content'
  navbar = '[class="nav navbar-nav"]'
  logout = '[class="fa fa-lock"]'


  // Getters
  getFeaturedProducts() {
    return cy.get(this.featuredProducts)
  }
  getModalContent(){
    return cy.get(this.modalContent)
  }
  getNavbar(){
    return cy.get(this.navbar)
  }
  getLogout(){
    return cy.get(this.logout)
  }

  // Metodos

  // Comunes
  /**
   * Se dirije a la pagina de producto de un item {index}
   * @param {int} index 
   */
  goToItemPage(index) {
    index -= 1
    this.getFeaturedProducts().eq(index).find('a').contains('View Product').click()
  }

  // Pruebas
  /**
   * Agrega un item al carrito
   * Luego se dirige a la pagina del carrito mediante el modal
   * Extrae el nombre del item del carrito y lo compara con la del producto agregado.
   * verification false significa que no va a hacer el assertion sobre el item del carrito
   * @param {int} number 
   * @param {bool} verification
   */
  addItemToCart(number, verification=true){
    number -= 1

    this.getFeaturedProducts().eq(number).find('p').first().then($item => {
      let itemName = $item.text()

      this.getFeaturedProducts().eq(number).find('[class="productinfo text-center"] [class="btn btn-default add-to-cart"]').click()

      this.getModalContent().find('a').click()

      if (verification) {
        onCart.getCartItem().eq(1).find('.cart_description a').then($cartItem =>{
          let cartItem = $cartItem.text()
          expect(itemName.trim()).to.equal(cartItem.trim())
        })
      }
    })
  }

  /**
   * Verifica que las tarjetas de los productos tengan las mismas dimensiones, comparandolos con la primer tarjeta.
   * Parametros son principalmente para la recursividad.
   */
  checkIfAllCardsHaveSameDimensions(index=0, height=0, width=0){
    let expectedHeight = 0 || height
    let expectedWidth = 0 || width

    this.getFeaturedProducts().eq(index).then($element => {

      // Toma el tamaño de la primera tarjeta y la guarda como referencia para el resto.
      if (index == 0) {
        expectedHeight = $element.height()
        expectedWidth = $element.width()
      }
      else {
        expect($element.height()).to.equal(expectedHeight)
        expect($element.width()).to.equal(expectedWidth)
      } 

      index++

      if (index >= 34) {
        return true
      }
      else {
        this.checkIfAllCardsHaveSameDimensions(index, expectedHeight, expectedWidth)
      }

    })
  }


}

export const onHome = new Home()