import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import RoadTripPage from "../pages/RoadTripPage/RoadTripPage";
import Dashboard from "../pages/DashboardPage"
import HomePage from "../pages/HomePage/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "../auth/protected-route";

function App() {
  const { isAuthenticated } = useAuth0();

  // const PublicRoute = ({ auth, ...props }) => {
  //   return isAuthenticated ? (
  //     <Route to="/">
  //       <Dashboard />
  //     </Route>
  //   ) : (
  //     <Route {...props} />
  //   );
  // };

  // const ProtectedRoute = ({ auth, ...props }) => {
  //   console.log(isAuthenticated);
  //   return isAuthenticated ? (
  //     <Route {...props} />
  //   ) : (
  //     <Route to="/home">
  //       <HomePage />
  //     </Route>
  //   );
  // };

  return (
    <Router>
      <Switch>

         <Route path="/" component ={RoadTripPage}/>
      </Switch>
    </Router>
  );
}

export default App;
