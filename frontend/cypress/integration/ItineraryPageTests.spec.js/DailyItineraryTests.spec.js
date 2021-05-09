/// <reference types="cypress" />

context('Daily itinerary', () => {
  const responseBody = {
    _id: 'mockId',
    days: [
      {
        id: 'day1',
        date: '2021-12-12T00:00:00.000Z',
        events: [],
      },
      {
        id: 'day2',
        date: '2021-12-13T00:00:00.000Z',
        events: [],
      },
      {
        id: 'day3',
        date: '2021-12-14T00:00:00.000Z',
        events: [],
      },
      {
        id: 'day4',
        date: '2021-12-15T00:00:00.000Z',
        events: [],
      },
    ],
  };

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
      body: responseBody,
    });

    // user is organiser
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

  it('checks that the itineray contains correct days', () => {
    cy.get('#prev-day-button').should('be.disabled');
    cy.get('#date-of-day').should('have.text', 'Sunday 12th December');
    cy.get('#next-day-button').click();
    cy.get('#date-of-day').should('have.text', 'Monday 13th December');
    cy.get('#next-day-button').click();
    cy.get('#date-of-day').should('have.text', 'Tuesday 14th December');
    cy.get('#next-day-button').click();
    cy.get('#date-of-day').should('have.text', 'Wednesday 15th December');
    cy.get('#next-day-button').should('be.disabled');
  });
});
