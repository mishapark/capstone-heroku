import { List, ListItem, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Search = () => {
  return (
    <Paper style={{ position: "absolute" }}>
      <List
        ref={searchRef}
        component="nav"
        aria-label="Products search results"
        sx={{
          width: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          top: "7%",
          left: "42%",
          zIndex: 2000,
          backgroundColor: "white",
          backgroundColor: "white",
          borderBottom: "1px solid gray",
          borderLeft: "1px solid gray",
          borderRight: "1px solid gray",
          borderRadius: "5px",
          boxShadow: "5px 10px 8px #888888",
        }}
      >
        {filteredData.slice(0, 15).map((value, key) => {
          return (
            <Link to={`/app/products/${value["_id"]}`} target="_blank">
              <ListItem button divider>
                <p>{value["product_details"]["product_name"]}</p>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};
