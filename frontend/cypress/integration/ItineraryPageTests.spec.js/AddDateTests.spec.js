/// <reference types="cypress" />

context('Add date', () => {
  const startDate = '12/12/2021';
  const endDate = '15/12/2021';

  beforeEach(() => {
    cy.visit('http://localhost:3000/road-trip/1/itinerary');
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

    cy.intercept('GET', '/api/roadtrip/1/itinerary', {
      statusCode: 200,
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

  afterEach(() => {
    cy.reload();
  });

  // https://on.cypress.io/interacting-with-elements

  it('opens the date selection modal and selects a start date and end date if the user is an organiser', () => {
    // user is organiser
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });

    cy.get('#add-dates-button').click();
    cy.get('#startDate').type(startDate);
    cy.get('#endDate').type(endDate);

    // assert dates have been entered
    cy.get('#startDate').should('have.value', startDate);
    cy.get('#endDate').should('have.value', endDate);

    cy.get('#submit-dates-button').click();
    cy.intercept('POST', '/api/roadtrip/1/itinerary');
  });
});
