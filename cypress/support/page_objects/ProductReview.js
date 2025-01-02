export class ProductReview {
  // Atributos
  reviewName = '#name'
  reviewEmail = '#email'
  reviewReview = '#review'
  reviewBtn = '#button-review'
  reviewModal = '.alert-success'
  itemQuanity = '#quantity'
  addToCartBtn = '[class="btn btn-default cart"]'
  modalContent = '.modal-content'

  // Getters
  getReviewName(){
    return cy.get(this.reviewName)
  }
  getReviewEmail(){
    return cy.get(this.reviewEmail)
  }
  getReviewReview(){
    return cy.get(this.reviewReview)
  }
  getReviewBtn(){
    return cy.get(this.reviewBtn)
  }
  getReviewModal(){
    return cy.get(this.reviewModal)
  }
  getItemQuantity(){
    return cy.get(this.itemQuanity)
  }
  getAddToCartBtn(){
    return cy.get(this.addToCartBtn)
  }
  getModalContent(){
    return cy.get(this.modalContent)
  }

  
  // Metodos

  /**
   * Se dirije a la pagina de un producto y deja una review
   * @param {string} name
   * @param {string} email 
   * @param {string} review 
   */
  leaveReview(name, email, review){
    this.getReviewName().type(name)
    this.getReviewEmail().type(email)
    this.getReviewReview().type(review)
    this.getReviewBtn().click()
  }

  /**
   * Agrega un {amount} cantidad de items al carrito
   * @param {int} amount 
   */
  addItemToCart(amount){
    this.getItemQuantity().clear().type(amount)
    this.getAddToCartBtn().click()
        
  }

}

export const onProductReview = new ProductReview()