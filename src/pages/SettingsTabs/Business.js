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
          <SettingsForm settingName={"business"}/>
        </Paper>
      </Box>
    </div>
  );
}

export default Business;
