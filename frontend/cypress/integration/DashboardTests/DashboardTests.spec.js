/// <reference types="cypress" />

context('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/roadtrip', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('opens the create new trip modal when clicking on the create new trip button on the dashboard', () => {
    cy.get('#create-new-trip-button').click();
    cy.get('#create-trip-modal').should('exist');
  });

  it('creates a new road trip with entered name', () => {
    cy.get('#create-trip-modal').click();
    cy.get('#create-trip-input-text').type('new roadie');
    cy.intercept('POST', '/api/roadtrip', (req) => {
      expect(req.body.name).to.include('new roadie');
    });
    cy.intercept('POST', '/api/roadtrip', {
      statusCode: 204,
      body: { name: 'new roadie' },
    });
    cy.intercept('GET', '/api/roadtrip', {
      statusCode: 200,
      body: {},
    });
    cy.get('#create-trip-submit-button').click();
  });

  it('should disable the submit button if trip name is empty', () => {
    cy.get('#create-new-trip-button').click();
    cy.get('#create-trip-input-text').clear();
    cy.get('#create-trip-submit-button').should('be.disabled');
  });
});
