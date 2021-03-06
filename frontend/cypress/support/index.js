// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

it('log out and back in before testing', () => {
  cy.visit('http://localhost:3000');

  cy.get('#username').type('cypress-testing@mydomain.com');
  cy.get('#password').type('Cypress14');
  cy.get('button').click();

  cy.intercept('GET', '/api/roadtrip', {
    statusCode: 200,
    body: {},
  });
});
// Alternatively you can use CommonJS syntax:
// require('./commands')
