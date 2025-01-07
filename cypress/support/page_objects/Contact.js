export class Contact {
  // Atributos
  name = '[data-qa="name"]'
  email = '[data-qa="email"]'
  subject = '[data-qa="subject"]'
  message = '[data-qa="message"]'
  submitBtn = '[data-qa="submit-button"]'

  // Getters
  getName() {
    return cy.get(this.name)
  }
  getEmail() {
    return cy.get(this.email)
  }
  getSubject() {
    return cy.get(this.subject)
  }
  getMessage() {
    return cy.get(this.message)
  }
  getSubmitBtn() {
    return cy.get(this.submitBtn)
  }
}

export const onContact = new Contact()