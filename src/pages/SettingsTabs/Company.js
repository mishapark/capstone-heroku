import { Box, Paper, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";

function Company() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <PageHeader
            icon={<ApartmentIcon />}
            title="Company Settings"
            description="Current Company Settings"
          ></PageHeader>
          <Divider />
          <br />
          <Grid container spacing={2} style={{ margin: "1em" }}>
            <Grid item xs={3}>
              <Typography>Company Name</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                label="Company Name"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid item xs={3}>
              <Typography>Company Address</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                label="Company Infromation"
                multiline
                rows={4}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid item xs={3}>
              <Typography>Company Email</Typography>
            </Grid>

            <Grid item xs={7}>
              <TextField variant="outlined" label="Email" fullWidth></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid item xs={3}>
              <Typography>Company Telephone</Typography>
            </Grid>

            <Grid item xs={7}>
              <TextField
                variant="outlined"
                label="Telephone"
                fullWidth
              ></TextField>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8} md={6}>
                <Button type="submit">Save</Button>
              </Grid>
              <Grid item xs={8} md={6}>
                <Button>Cancel</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Company;
