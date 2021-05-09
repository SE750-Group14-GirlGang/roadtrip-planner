/// <reference types="cypress" />

context('Side Bar', () => {
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
    cy.intercept('GET', '/api/roadtrip/1/isUserOrganiser', {
      statusCode: 200,
      body: { result: true },
    });
    cy.intercept('GET', '/api/roadtrip/1/organiser', {
      statusCode: 200,
      body: {},
    });
    cy.intercept('GET', 'api/roadtrip/1/spotify', {
      statusCode: 200,
      body: {},
    });
  });

  after(() => {
    cy.reload();
    cy.get('#logout').click();
  });

  it('shows burger button within a roadie', () => {
    cy.get('#burger-button').should('exist');
  });

  it('opens side bar when burger button is clicked', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#side-bar').should('exist');
      });
  });

  it('navigates to the itinerary page when clicking on the itinerary link in the side bar', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#itinerary-link').click();
        cy.on('url:changed', (newUrl) => {
          expect(newUrl).to.contain('/road-trip/1/itinerary');
        });
      });
  });

  it('navigates to the emergency details page when clicking on the emergency details link in the side bar', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#emergency-details-link').click();
        cy.on('url:changed', (newUrl) => {
          expect(newUrl).to.contain('/road-trip/1/emergency-details');
        });
      });
  });

  it('navigates to the map page when clicking on the map link in the side bar', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#emergency-details-link').click();
      });
    cy.get('#map-link')
      .click()
      .then(() => {
        cy.on('url:changed', (newUrl) => {
          expect(newUrl).to.contain('/road-trip/1/map');
        });
      });
  });

  it('navigates to the packing list page when clicking on the packing list link in the side bar', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#packing-list-link').click();
        cy.on('url:changed', (newUrl) => {
          expect(newUrl).to.contain('/road-trip/1/packing-list');
        });
      });
  });

  it('navigates to the Spotify playlist page when clicking on the Spotify playlist link in the side bar', () => {
    cy.get('#burger-button')
      .click()
      .then(() => {
        cy.get('#spotify-playlist-link').click();
        cy.get('#authorise-playlist-button').should('exist');
      });
  });
});
