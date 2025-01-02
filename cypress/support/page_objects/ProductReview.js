export class ProductReview {
  // Atributos
  reviewName = '#name'
  reviewEmail = '#email'
  reviewReview = '#review'
  reviewBtn = '#button-review'
  reviewModal = '.alert-success'

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
  
  // Metodos
  leaveReview(name, email, review){
    this.getReviewName().type(name)
    this.getReviewEmail().type(email)
    this.getReviewReview().type(review)
    this.getReviewBtn().click()
  }

}

export const onProductReview = new ProductReview()