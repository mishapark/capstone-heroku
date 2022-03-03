import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Card, Stack } from "@mui/material";
import { TextField } from "@material-ui/core";
import { Box} from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Tooltip } from "chart.js";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Select, MenuItem } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { width } from "@mui/system";
import { GeneralTable } from "../components/CustomTable/GeneralTable";
import { Table } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import "react-widgets/styles.css";
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";

export const RFQ = () => {
  const [state, setState] = React.useState('');
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChangee = (newValue) => {
    setValue(newValue);
  };

  const [headers, setHeaders] = React.useState([
    {
      "name": "RFQ Number", 
      "id":1
    },
    {
      "name": "Status", 
      "id":2
    },
    {
      "name": "Stage", 
      "id":3
    }
  ])
  const [data, setData] = React.useState([
    {
      "name": 1232,
      "id": 1,
    }, 
    {
      "name": "Draft",
      "id": 2,
    }, 
    {
      "name": "In progress",
      "id": 3,
    }, 
  ])
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  )


  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <> 
    <Stack spacing={2}>
      {}
      <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">RFQ Manager</Typography>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
            Create
          </Button>
        </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Create new RFQ</DialogTitle>
        <DialogContent sx={{width:"900px"}}>
          <DialogContentText>
            Please, fill in the information
          </DialogContentText>
          <Stack spacing={2} sx={{mt:2}}>
                    <TextField
                      id="to"
                      label="To"
                      variant="outlined"
                      autoFocus
                      required
                      size="small"
                    />
                    <TextField
                      id="from"
                      label="From"
                      variant="outlined"
                      required
                      size="small"
                    />
                    <TextField
                      id="rfq-date"
                      label={date}
                      variant="outlined"
                      required
                      disabled
                      size="small"
                    />
                    
                    <TextField
                      id="vendor-details"
                      label="Vendor Details"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <DatePicker placeholder="Date Required By" />
                     
                    <DropdownList
                      placeholder="Approver"
                      data={["Andrew", "Timothy", "Christine", "Mikhail"]}
                    />
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={5}
                      size="small"
                      required
                    />
                    <TextField
                      id="other-instruction"
                      label="Any Other Instructions For Quoting"
                      variant="outlined"
                      multiline
                      rows={3}
                      size="small"
                    />
                    <TextField
                      id="statement"
                      label="Statement For Qualification"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <DropdownList
                      placeholder="Status"
                      data={["Draft", "Published"]}
                    />
                  </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: "100%", mt:2}}>
      <Paper sx={{ width: "100%", mt: 2 }}>
        <Table>
              <TableHead>
                  <TableRow key={1}>
                
                    <TableCell key={11}>RFQ Number</TableCell>
                    <TableCell key={12}>Status</TableCell>
                    <TableCell key={13}>Stage</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                      <TableRow key={2}>
                          <TableCell key={21}>Test</TableCell>
                          <TableCell key={21}>Draft</TableCell>
                          <TableCell key={21}>In Progress</TableCell>
                      </TableRow>
              </TableBody>
          </Table>
      </Paper>
    </Box>
    </Stack>
    </>
  );
};
