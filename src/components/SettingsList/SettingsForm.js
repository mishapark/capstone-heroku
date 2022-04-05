import { Box, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";

function SettingsForm() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} style={{ margin: "1em" }}>
          <Grid item xs={3}>
            <Typography>Company Name</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              variant="outlined"
              label="Person name"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={11}>
            <Divider variant="middle"></Divider>
          </Grid>
          <Grid item xs={3}>
            <Typography>Person's Email</Typography>
          </Grid>

          <Grid item xs={7}>
            <TextField variant="outlined" label="Email" fullWidth></TextField>
          </Grid>
          <Grid item xs={11}>
            <Divider variant="middle"></Divider>
          </Grid>
          <Grid item xs={3}>
            <Typography>Person's Telephone</Typography>
          </Grid>

          <Grid item xs={7}>
            <TextField
              variant="outlined"
              label="Telephone"
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SettingsForm;
