import { Button, Card, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './Trip.module.css';

export default function Trip({ tripName, id, disable }) {
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
