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
          <SettingsForm settingName={"engineering"} />
          
        </Paper>
      </Box>
    </div>
  );
}

export default Engineering;
