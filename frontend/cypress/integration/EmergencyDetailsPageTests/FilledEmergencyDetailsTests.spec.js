/// <reference types="cypress" />

import allEmergencyDetails from '../../fixtures/allEmergencyDetails.json';
import userEmergencyDetails from '../../fixtures/userEmergencyDetails.json';

context('Test Filled Emergency Details', () => {
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
    cy.intercept('GET', '/api/roadtrip/1/emergencydetails/user', {
      statusCode: 200,
      body: userEmergencyDetails,
    });
    cy.intercept('GET', '/api/roadtrip/1/emergencydetails', {
      statusCode: 200,
      body: allEmergencyDetails,
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('Filled Emergency Details Table', () => {
    // First Row
    cy.get('#emergency-details-table').contains('Rachel Peter');
    cy.get('#emergency-details-table').contains('0279620695');
    cy.get('#emergency-details-table').contains('Tim Peter');
    cy.get('#emergency-details-table').contains('Father');
    cy.get('#emergency-details-table').contains('065 568 8790');

    // Second Row
    cy.get('#emergency-details-table').contains('April Scott');
    cy.get('#emergency-details-table').contains('891 287 2891');
    cy.get('#emergency-details-table').contains('Billy Scott');
    cy.get('#emergency-details-table').contains('Mother');
    cy.get('#emergency-details-table').contains('722 783 2973');
  });

  it('Edit Details', () => {
    cy.get('#details-button').contains('Edit Your Details');

    // Edit details
    cy.get('#details-button').click();

    // Enter new details in modal
    cy.get('#enter-name-field').clear().type('Change Full Name');
    cy.get('#phone-number-field').clear().type('+64 21 980 9378');
    cy.get('#emergency-contact-name-field').clear().type('Emergency Contact Name');
    cy.get('#emergency-contact-relation-field').clear().type('Relation');
    cy.get('#emergency-contact-phone-field').clear().type('+64 21 456 4536');

    // Check details were sent correctly
    cy.intercept('PUT', '/api/roadtrip/1/emergencydetails/user', (req) => {
      expect(req.body).to.include('Change Full Name');
      expect(req.body).to.include('+64 21 980 9378');
      expect(req.body).to.include('Emergency Contact Name');
      expect(req.body).to.include('Relation');
      expect(req.body).to.include('+64 21 456 4536');
    });
  });
});
