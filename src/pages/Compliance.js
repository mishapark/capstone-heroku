import * as React from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IosShareIcon from "@mui/icons-material/IosShare";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(num, icon, report, issue, expiery) {
  return { num, icon, report, issue, expiery };
}

const rows = [createData(1, "Download", 16.0, 49, 3.9)];

function Compliance() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", marginTop: 5 }}
        >
          Compliance Reports
        </Typography>
        <Grid container spacing={1} sx={{ m: 2 }}>
          <Grid item xs>
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <TextField
              id="standard-basic"
              label="Report number"
              variant="standard"
            />
          </Grid>
          <Grid item xs>
            <IconButton aria-label="download">
              <DownloadIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Report type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value="Safety Reports">Safety Reports</MenuItem>
                  <MenuItem value="UL/CSA Reports">UL/CSA Report</MenuItem>
                  <MenuItem value="NRTL Report">NRTL Report</MenuItem>
                  <MenuItem value="Laser Report">Laser Report</MenuItem>
                  <MenuItem value="IEC Report">IEC Report</MenuItem>
                  <MenuItem value="CE Report">CE Report</MenuItem>
                  <MenuItem value="EMC Report">EMC Report</MenuItem>
                  <MenuItem value="CB Report">CB Report</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="standard-basic"
              label="Standard name"
              variant="standard"
            />
          </Grid>
          <Grid item xs>
            <TextField id="standard-basic" type="date" />
          </Grid>
          <Grid item xs>
            <TextField id="standard-basic" type="date" />
          </Grid>
          <Grid item xs>
            <IconButton aria-label="Share">
              <IosShareIcon />
            </IconButton>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="20%">Report Number</TableCell>
                <TableCell align="right" width="10%">Download</TableCell>
                <TableCell align="right" width="20%">Record Type</TableCell>
                <TableCell align="right" width="20%">Standard name</TableCell>
                <TableCell align="right" width="15%">Issued Date</TableCell>
                <TableCell align="right" width="15%" >Expirey Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Compliance;
