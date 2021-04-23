import React from "react";
import { Button, Card, CardActionArea } from "@material-ui/core";
import styles from "./GroupsList.module.css"
import { Link } from "react-router-dom";

export default function GroupsList({ groups, disable }) {
  return (
    <div>
      {groups.map((item, index) => (
        <Group key={index} groupName={item.name} id={item._id} disable={disable} />
      ))}
    </div>
  );
}

function Group({ groupName, id, disable }) {
  return (
    <Card className={styles.group}>
      <CardActionArea>
        <Button component={Link} to={`/road-trip/${id}`} disabled={disable}>
          {groupName + id}
        </Button>
      </CardActionArea>
    </Card>
  );
}
