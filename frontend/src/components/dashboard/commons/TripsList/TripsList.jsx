import React from 'react';
import { Button, Card, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './TripsList.module.css';

export default function TripsList({ trips, disable }) {
  return (
    <div>
      {trips.map((item, index) => (
        <Trip key={index} tripName={item.name} id={item._id} disable={disable} />
      ))}
    </div>
  );
}

function Trip({ tripName, id, disable }) {
  return (
    <Card className={styles.trip}>
      <CardActionArea>
        <Button component={Link} to={`/road-trip/${id}`} disabled={disable}>
          {tripName}
        </Button>
      </CardActionArea>
    </Card>
  );
}
