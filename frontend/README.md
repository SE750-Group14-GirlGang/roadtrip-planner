# Set up

Create a .env file in frontend/ that has the following credentials for connecting to auth0, and accessing the mapping API

```
REACT_APP_AUTH0_DOMAIN= XXXXX
REACT_APP_AUTH0_CLIENT_ID= XXXX
REACT_APP_AUTH0_AUDIENCE= XXXX
REACT_APP_MAPBOX_TOKEN= XXXX
```

# Running Cypress

To run cypress tests, open terminal in the frontend and run the following command:

```
npm run cypress:open
```
