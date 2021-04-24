import React, { useState } from "react";
import styles from "./PackingList.module.css";

import { Button } from "@material-ui/core";

import Item from "./Item/Item";

export default function PackingList() {
    const packingListItems = ["sleeping bag", "sleeping mat", "pillow", "alcohol", "clothing", "cutlery", "towel", "togs", "phone charger", "ear plugs", "hoons", "bowl"];

    const [userPackedItems, setUserPackedItems] = useState(["sleeping bag", "hoons", "alcohol", "ear plugs"]);

    const handleChange = (item) => {
        let newUserPackedItems = [...userPackedItems];
        if (userPackedItems.includes(item)) {
            newUserPackedItems = newUserPackedItems.filter((e) => e !== item); // unchecking the item
        } else {
            newUserPackedItems.push(item); // checking the item
        }
        setUserPackedItems(newUserPackedItems);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>Packing List</div>
                <div className={styles.cardContent}>
                    {packingListItems.length
                        ? packingListItems.map((item, index) => (
                              <div key={index}>
                                  <Item
                                      name={item}
                                      checked={userPackedItems.includes(item)} // TODO: convert this list to a map for speed
                                      onChange={() => handleChange(item)}
                                  />
                              </div>
                          ))
                        : "The organiser has not added any items to the packing list!"}
                </div>
                <div className={styles.cardFooter}>
                    <Button variant="contained" color="primary">
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}
