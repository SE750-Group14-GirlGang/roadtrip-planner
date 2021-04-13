import React from "react";
import { Button, Card, CardActionArea } from "@material-ui/core";
import styles from "../../../../pages/DashboardPage/DashboardPage.module.css";
import { Link } from "react-router-dom";

export default function GroupsList({ groups }) {
  return (
    <div>
      {groups.map((item, index) => (
        <Group key={index} groupName={item.name} id={item._id} />
      ))}
    </div>
  );
}

function Group({ groupName, id }) {
  return (
    <Card className={styles.group}>
      <CardActionArea>
        <Button component={Link} to={`/road-trip/${id}`}>
          {groupName + id}
        </Button>
      </CardActionArea>
    </Card>
  );
}
