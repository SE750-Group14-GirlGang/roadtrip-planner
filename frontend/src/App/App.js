import React from 'react';
import { Switch } from 'react-router-dom';
import RoadTripPage from '../pages/RoadTripPage/RoadTripPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import ProtectedRoute from '../auth/protected-route';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <ProtectedRoute exact path="/" component={DashboardPage} />
        <ProtectedRoute path="/road-trip/:id" component={RoadTripPage} />
      </Switch>
    </div>
  );
}

export default App;
