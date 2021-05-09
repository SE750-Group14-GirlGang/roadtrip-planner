/// <reference types="cypress" />

context('Top Bar Attendee List', () => {
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
    cy.intercept('GET', '/api/roadtrip/1/organiser', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('shows attendees icon without the plus for regular attendees of a road trip', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: false },
    });
    cy.get('#regular-attendees-button').should('exist');
  });

  it('shows attendees icon with the plus for the organiser of a road trip', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.get('#organiser-attendees-button').should('exist');
  });

  it('opens the attendee list modal when the attendees icon is clicked within a road trip', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.get('#organiser-attendees-button')
      .click()
      .then(() => {
        cy.get('#attendees-modal');
      });
  });

  it('only allows the organiser to add new attendees within a road trip', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.get('#organiser-attendees-button')
      .click()
      .then(() => {
        cy.get('#add-attendee-text-field').should('exist');
      });
  });

  it('does not allow attendees to add new attendees within a road trip', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: false },
    });
    cy.get('#regular-attendees-button')
      .click()
      .then(() => {
        cy.get('#add-attendee-text-field').should('not.exist');
      });
  });

  it('adds an attendee to the road trip if the organiser adds one from the attendees modal', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('PATCH', '/api/roadtrip/1/attendees', {
      userEmail: 'lauralalaurah@gmail.com',
    });
    cy.get('#organiser-attendees-button')
      .click()
      .then(() => {
        cy.get('#add-attendee-text-field').type('lauralalaurah@gmail.com');
        cy.get('#add-attendee-button').click();
      });
  });
});
