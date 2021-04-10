import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import RoadtripPage from "../pages/Roadtrip/RoadTrip";
import HomePage from "../pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route exact path="/Roadtrip">
          <RoadtripPage />
        </Route>

        <Route exact path="/home">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import RoadtripPage from "./pages/RoadtripPage";
// import PublicHomePage from "./pages/PublicHomePage";
// import { useAuth0 } from "@auth0/auth0-react";

// import ProtectedRoute from "./auth/protected-route";

// function App() {
//   const { isAuthenticated } = useAuth0();

//   const PublicRoute = ({ auth, ...props }) => {
//     return isAuthenticated ? (
//       <Route to="/roadtrip">
//         <RoadtripPage />
//       </Route>
//     ) : (
//       <Route {...props} />
//     );
//   };

//   const ProtectedRoute = ({ auth, ...props }) => {
//     return isAuthenticated ? (
//       <Route {...props} />
//     ) : (
//       <Route to="/">
//         <PublicHomePage />
//       </Route>
//     );
//   };

//   return <ProtectedRoute path="/roadtrip/" component={RoadtripPage} />;
// }

// export default App;
