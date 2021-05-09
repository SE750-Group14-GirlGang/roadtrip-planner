/// <reference types="cypress" />

context('Test Empty Emergency Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/road-trip/1/emergency-details');
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

  it('Fill in emergency details in modal and submit', () => {
    cy.get('#details-button').contains('Add Your Details');
    cy.get('#details-button').click();

    cy.get('#enter-name-field').type('Full Name');
    cy.get('#phone-number-field').type('+64 21 980 9378');
    cy.get('#emergency-contact-name-field').type('Emergency Contact Name');
    cy.get('#emergency-contact-relation-field').type('Relation');
    cy.get('#emergency-contact-phone-field').type('+64 21 456 4536');

    cy.get('#submit-details').click();

    // Check details were sent correctly
    cy.intercept('PUT', '/api/roadtrip/1/emergencydetails/user', (req) => {
      expect(req.body).to.include('Full Name');
      expect(req.body).to.include('+64 21 980 9378');
      expect(req.body).to.include('Emergency Contact Name');
      expect(req.body).to.include('Relation');
      expect(req.body).to.include('+64 21 456 4536');
    });
  });

  it('Check emergency details empty table displays correctly', () => {
    cy.get('#emergency-details-table').contains('Name');
    cy.get('#emergency-details-table').contains('Number');
    cy.get('#emergency-details-table').contains('Emergency Contact Name');
    cy.get('#emergency-details-table').contains('Emergency Contact Relation');
    cy.get('#emergency-details-table').contains('Emergency Contact Number');
  });
});
