import { Grid, Typography } from "@material-ui/core";
import React from "react";

export const PageHeader = ({ icon, title, description }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={0}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {icon}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Grid>
    </Grid>
  );
};
