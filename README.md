# Welcome to Roadie!

**Roadie** is an application designed to help with all aspects of roadtrip planning

[Click here](https://github.com/SE750-Group14-GirlGang/roadtrip-planner/wiki) to view our wiki! It has tons of information about our Github workflow, application features, frontend and backend structure, design, and our project management.

This README is just for how run the application and how to run tests.

# To Run the Application

The application frontend and backend must be running at the same time.
Follow the general installation instructions, then follow the separate instructions to get the frontend and backend runnning.

## General Instructions

-   Install node.js from https://nodejs.org/en/
-   Open a terminal and navigate to the project root folder
-   Install npm version 6 using `npm install -g npm@6` (this is so peer dependencies resolve in the legacy manner. Especially important for Windows users. See [here](https://stackoverflow.com/questions/66734503/react-npm-start-not-working-no-version-of-chokidar-available))

## Run the Frontend

-   Create a `.env` file in the `frontend` folder with the following content:

```
REACT_APP_AUTH0_DOMAIN=XXXXX
REACT_APP_AUTH0_CLIENT_ID=XXXXX
REACT_APP_AUTH0_AUDIENCE=XXXXX
REACT_APP_MAPBOX_TOKEN=XXXXX
REACT_APP_SPOTIFY_CLIENT_ID=XXXXX
REACT_APP_SPOTIFY_CLIENT_SECRET=XXXXX
REACT_APP_SPOTIFY_REDIRECT_URI=XXXXX
```

-   Open a terminal and navigate to the `frontend` folder
-   Run `npm install` to install dependencies
-   Run `npm start` to run the frontend

## Run the Backend

-   Create a `.env` file in the `backend` folder with the following content:

```
MONGO_DB_PW=XXXXX
MONGO_DB_USERNAME=XXXXX
REACT_APP_AUTH0_AUDIENCE=XXXXX
```

-   Open a terminal and navigate to the `backend` folder
-   Run `npm install` to install dependencies
-   Run `npm start` to run the backend

## Open the Application

-   Navigate to `http://localhost:3000/` in a browser (or it will open automatically when the `frontend` has started running)

# To Test the Application

## Test the Frontend Using Cypress

Cypress is used for frontend integration testing. The frontend must be running for these tests to work. The backend does not need to be running.

-   Follow the instructions above to run the `frontend`
-   Open a terminal and navigate to the `frontend` folder
-   Run `npm run cypress:open` to open the Cypress application
-   Click on whichever test you would like to run (please run each test individually)

## Test the Frontend Using Jest

Jest is used for frontend unit testing.

-   Open a terminal and navigate to the `frontend` folder
-   Run `npm install`
-   Run `npm test`

## Test the Backend

Jest, Express, MongoMemoryServer, and Babel Rewire are used for backend integration and unit testing. Backend dependencies must be installed. The backend and frontend must **not** be running for these tests to work (port usage will conflict)

-   Open a terminal and navigate to the `backend` folder
-   Run `npm install`
-   Run `npm test`
