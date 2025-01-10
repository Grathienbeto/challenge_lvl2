export class SignupPage {
  // Atributos
  name = '[data-qa="name"]'
  email = '[data-qa="email"]'
  password = '[data-qa="password"]'
  day = '[data-qa="days"]'
  month = '[data-qa="months"]'
  year = '[data-qa="years"]'
  firstName = '[data-qa="first_name"]'
  lastName = '[data-qa="last_name"]'
  company = '[data-qa="company"]'
  address = '[data-qa="address"]'
  country = '[data-qa="country"]'
  state = '[data-qa="state"]'
  city = '[data-qa="city"]'
  zip = '[data-qa="zipcode"]'
  mobile = '[data-qa="mobile_number"]'
  create_btn = '[data-qa="create-account"]'


  // Getters
  getName() {
    return cy.get(this.name)
  }
  getEmail() {
    return cy.get(this.email)
  }
  getPassword(){
    return cy.get(this.password)
  }
  getDay(){
    return cy.get(this.day)
  }
  getMonth(){
    return cy.get(this.month)
  }
  getYear(){
    return cy.get(this.year)
  }
  getFirstName(){
    return cy.get(this.firstName)
  }
  getLastName(){
    return cy.get(this.lastName)
  }
  getCompany(){
    return cy.get(this.company)
  }
  getAdress(){
    return cy.get(this.address)
  }
  getCountry(){
    return cy.get(this.country)
  }
  getState(){
    return cy.get(this.state)
  }
  getCity(){
    return cy.get(this.city)
  }
  getZip(){
    return cy.get(this.zip)
  }
  getMobile(){
    return cy.get(this.mobile)
  }
  getCreateBtn(){
    return cy.get(this.create_btn)
  }

}

export const onSignupPage = new SignupPage()