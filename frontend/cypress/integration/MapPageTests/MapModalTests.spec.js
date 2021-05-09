/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/road-trip/1/map%27');
    cy.intercept('GET', '/api/roadtrip/1', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', '/api/roadtrip/1/attendees', {
      statusCode: 200,
      body: ['a', 'b', 'c'],
    });

    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/organiser', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  // https://on.cypress.io/interacting-with-elements

  it('opens the map selection modal and selects a destination if the user is an organiser', () => {
    cy.get('#add-destination-button').click();
  });
});
