/// <reference types="cypress" />

context('Packing List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/road-trip/1/packing-list');
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
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/packinglist', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', '/api/roadtrip/1/packeditems/user', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('shows add button if user is the organiser', () => {
    cy.get('#add-item-button').should('exist');
  });

  it('opens add item modal when add button clicked', () => {
    cy.get('#add-item-button').click();
  });

  it('opens add item modal and enters new item', () => {
    cy.get('#add-item-button').click();
    cy.get('#add-item-text-field').click();
    cy.get('#add-item-cancel').click();
  });

  it('should disable submit button when text field empty in add item modal', () => {
    cy.get('#add-item-button').click();
    cy.get('#add-item-text-field').clear();
    cy.get('#add-item-submit').should('be.disabled');
  });
});
