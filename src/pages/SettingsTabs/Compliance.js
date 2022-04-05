import { Box, Button, Divider, Paper } from "@material-ui/core";
import React from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import SettingsForm from "../../components/SettingsList/SettingsForm";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { GroupAdd } from "@mui/icons-material";
import { Grid } from "@mui/material";

function Compliance() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <PageHeader
            icon={<AssignmentTurnedInIcon />}
            title="Compliance Settings"
            description="Current Complaince Settings"
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

export default Compliance;
