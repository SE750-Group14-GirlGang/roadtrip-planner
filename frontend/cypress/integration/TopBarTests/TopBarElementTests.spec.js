/// <reference types="cypress" />

context('Other Top Bar Elements', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/roadtrip', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', '/api/roadtrip/1', {
      statusCode: 200,
      body: {
        name: 'name here',
      },
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
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('shows the create new trip button on the dashboard', () => {
    cy.get('#create-new-trip-button').should('exist');
  });

  it('does not show the create new trip button within a roadie', () => {
    cy.visit('http://localhost:3000/road-trip/1/map%27');
    cy.get('#create-new-trip-button').should('not.exist');
  });

  it('shows the road trip title corresponding to the roadie the user is in', () => {
    cy.visit('http://localhost:3000/road-trip/1/map%27');
    cy.get('#road-trip-name').contains('name here');
  });

  it('shows the logout button on the dashboard page', () => {
    cy.get('#logout').should('exist');
  });

  it('shows the logout button within a roadie', () => {
    cy.visit('http://localhost:3000/road-trip/1/map%27');
    cy.get('#logout').should('exist');
  });
});
