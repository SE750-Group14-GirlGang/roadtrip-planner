import React from 'react';
import { Button, Card, CardActionArea} from "@material-ui/core";
import styles from '../../../../pages/DashboardPage/DashboardPage.module.css'

export default function GroupsList({groups}) {
  return (
    <div>
      {groups.map(
        (item, index) => <Group key={index} groupName={item} />
      )}
    </div>
  );
}

function Group({groupName}) {
  return (
    <Card className={styles.group}>
      <CardActionArea>
        <Button>
          {groupName}
        </Button>
      </CardActionArea>
    </Card>
  );
}