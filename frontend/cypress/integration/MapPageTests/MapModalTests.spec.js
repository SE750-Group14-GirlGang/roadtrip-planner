/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/road-trip/60972c5df151d3ebb2a408b6/map');
  });

  // https://on.cypress.io/interacting-with-elements

  it('opens the map selection modal and selects a destination', () => {
    cy.get('#add-destination-button').click();
  });
});
