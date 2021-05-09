/// <reference types="cypress" />

context('Actions', () => {
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
    cy.intercept('GET', '/api/roadtrip/1/organiser', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('opens the map selection modal and click cancel to close it, if the user is an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').click();
    cy.get('#modal-cancel').click();
  });

  it('opens the map modal and searches for a location successfully, if the user is an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').click();
    cy.get('input')
      .type('Whangamata')
      .then(() => {
        cy.wait(1000);
        cy.get('ul li:first').should('have.class', 'active');
      });
  });

  it('opens the map modal and submits a destination correctly, if the user is an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').click();
    cy.get('input')
      .type('Whangamata')
      .then(() => {
        cy.wait(1000);
        cy.get('ul li:first').click();
        cy.wait(1000);
        cy.get('#modal-submit').click();
        cy.intercept('POST', '/api/roadtrip/1/map', (req) => {
          expect(req.body).to.include(175.876205);
          expect(req.body).to.include(-37.211686);
          expect(req.body).to.include('Whangamata Beach, Esplanade Drive, Whangamata, Waikato 3620, New Zealand');
        });
      });
  });

  it('opens the map modal and handles submitted destination information (loads submitted data into map page), if the user is an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').click();
    cy.get('input')
      .type('Whangamata')
      .then(() => {
        cy.wait(1000);
        cy.get('ul li:first').click();
        cy.wait(1000);
        cy.get('#modal-submit').click();
        cy.intercept('POST', '/api/roadtrip/1/map', {
          statusCode: 204,
          body: {
            primaryDestination: {
              long: 175.876205,
              lat: -37.211686,
              name: 'Whangamata Beach, Esplanade Drive, Whangamata, Waikato 3620, New Zealand',
            },
          },
        });
        cy.wait(2000);
        cy.get('#map-description').contains('Whangamata Beach, Esplanade Drive, Whangamata, Waikato 3620, New Zealand');
      });
  });

  it('loads a destination into the map page correctly if map data has already been submitted', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: false },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {
        primaryDestination: {
          long: 0,
          lat: 0,
          name: 'Africa',
        },
      },
    });
    cy.get('#map-description').contains('Africa');
  });

  it('does not show add destination button if the user is not an organiser', () => {
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: false },
    });
    cy.intercept('GET', '/api/roadtrip/1/map', {
      statusCode: 200,
      body: {},
    });
    cy.get('#add-destination-button').should('not.exist');
  });
});
