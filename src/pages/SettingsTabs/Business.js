import { Box, Button, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";
import SettingsForm from "../../components/SettingsList/SettingsForm";

function Business() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <PageHeader
            icon={<ApartmentIcon />}
            title="Business Settings"
            description="Current Business Settings"
          ></PageHeader>
          <Divider />
          <br />
          <SettingsForm></SettingsForm>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6}>
              <Button type="submit">Save</Button>
            </Grid>
            <Grid item xs={8} md={6}>
              <Button>Cancel</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Business;
