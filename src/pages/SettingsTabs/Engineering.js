import React from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Box, Button, Divider, Grid, Paper } from "@material-ui/core";
import { PageHeader } from "../../components/Header/PageHeader";
import SettingsForm from "../../components/SettingsList/SettingsForm";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

function Engineering() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <PageHeader
            icon={<EngineeringIcon />}
            title="Engineering Settings"
            description="Current Engineering Settings"
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

export default Engineering;
