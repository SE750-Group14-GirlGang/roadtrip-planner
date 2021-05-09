/// <reference types="cypress" />
import packingList from '../../fixtures/packingList.json';

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
      body: { result: false },
    });
    cy.intercept('GET', '/api/roadtrip/1/packinglist', {
      statusCode: 200,
      body: packingList,
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

  it('does not show add button if user is not the organiser', () => {
    cy.get('#add-item-button').should('not.exist');
  });
});
