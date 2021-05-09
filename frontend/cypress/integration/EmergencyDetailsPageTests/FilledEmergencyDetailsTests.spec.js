/// <reference types="cypress" />

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
      body: {
        emergencyContact: { name: 'Tim', relation: 'Father', phoneNumber: '982 7380 289' },
        _id: '609770ac85a60252abedd1a5',
        name: 'Sally Blue',
        phoneNumber: '83 392 839',
        user: '608602c6c4155b006f4d3124',
        __v: 0,
      },
    });
    cy.intercept('GET', '/api/roadtrip/1/emergencydetails', {
      statusCode: 200,
      body: [
        {
          emergencyContact: {
            name: 'Tim Peter',
            relation: 'Father',
            phoneNumber: '065 568 8790',
          },
          _id: '6094777b69357ad3cc80addf',
          name: 'Rachel Peter',
          phoneNumber: '0279620695',
          user: '60853b82081aff00692b2ac7',
          __v: 0,
        },
        {
          emergencyContact: {
            name: 'Billy Scott',
            relation: 'Mother',
            phoneNumber: '722 783 2973',
          },
          _id: '6097778360f73b5693163c7d',
          name: 'April Scott',
          phoneNumber: '891 287 2891',
          user: '608602c6c4155b006f4d3124',
          __v: 0,
        },
      ],
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
