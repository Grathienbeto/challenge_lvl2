import { onHome } from "../../support/page_objects/Home";


describe("UnHappy path tests", () => {

  beforeEach("Ir a la pagina", () => {
    cy.visitApp();
  });

  it.only("16. Todas las tarjetas de productos destacados tengan mismo tamaño", () => {
    onHome.checkIfAllCardsHaveSameDimensions()
  })

})