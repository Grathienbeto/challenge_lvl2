export class ProductsPage {
  // Atributos
  searchProductInput = '[id="search_product"]'
  searchBtn = '[id="submit_search"]'
  featuredItems = '[class="features_items"]'

  // Getters
  getSearchProductInput(){
    return cy.get(this.searchProductInput)
  }
  getSearchBtn(){
    return cy.get(this.searchBtn)
  }
  getFeaturedItems(){
    return cy.get(this.featuredItems)
  }

  // Metodos

  /**
   * Busca productos por palabra
   * @param {string} name 
   */
  searchProducts(name){
    this.getSearchProductInput().type(name)
    this.getSearchBtn().click()
  }


}

export const onProductsPage = new ProductsPage()