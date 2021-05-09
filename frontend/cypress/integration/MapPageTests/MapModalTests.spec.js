/// <reference types="cypress" />

context('Map Page Modal', () => {
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
    cy.intercept('GET', '/api/roadtrip/1/organiser', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: false },
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('loads a destination into the map page correctly if map data has already been submitted', () => {
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {
        primaryDestination: {
          long: 0,
          lat: 0,
          name: 'Africa',
        },
      },
    });
    cy.get('#map-description').contains('Africa');
  });

  it('does not show add destination button if the user is not an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').should('not.exist');
  });
});
