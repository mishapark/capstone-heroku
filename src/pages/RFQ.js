import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Card, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Tooltip } from "chart.js";
import { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Select, MenuItem } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const RFQ = () => {
  const [state, setState] = React.useState("");

  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const user_id = "620c6a949115e6ac657a4607";

  const [rfqs, setRfqs] = React.useState([]);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/rfqs"
      );
      console.log(response.data);
      setRfqs(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    sendGetRequest();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();
  const [newRfq, setNewRfq] = useState({
    user_id: "620c6a949115e6ac657a4607",
  });

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleInput = (e) => {
    const newData = { ...newRfq };
    newData[e.target.id] = e.target.value;
    setNewRfq(newData);
    console.log(newRfq);
  };

  const handleSelect = (e, value) => {
    const newData = { ...newRfq };
    newData[e.target.id] = value;
    setNewRfq(newData);
    console.log(newRfq);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    axios
      .post(`https://humber-capstone-backend.herokuapp.com/rfqs/add`, newRfq, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        if (response.data.message === "Sucessfully Submitted") {
          navigate("/tasks");
        }
      });
  };

  const handleDelete = (rfq) => {
    axios
      .delete(
        `https://humber-capstone-backend.herokuapp.com/rfqs/delete?rfqNumber=${rfq}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(function (response) {
        if (response.data.message === "Sucessfully Submitted") {
          navigate("/tasks");
        }
      });
  };

  return (
    <>
      <Stack spacing={2}>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmitData}>
              <DialogTitle>Create new RFQ</DialogTitle>
              <DialogContent sx={{ width: "900px" }}>
                <DialogContentText>
                  Please, fill in the information
                </DialogContentText>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <TextField
                    id="to"
                    label="To"
                    variant="outlined"
                    autoFocus
                    required
                    size="small"
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="from"
                    label="From"
                    variant="outlined"
                    required
                    size="small"
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="rfq-date"
                    label={date}
                    variant="outlined"
                    required
                    disabled
                    size="small"
                    onChange={(e) => handleInput(e)}
                  />

                  <TextField
                    id="vendor-details"
                    label="Vendor Details"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                  <DesktopDatePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={(e) => handleInput(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <Autocomplete
                    disablePortal
                    id="approver"
                    onChange={(event, value) => handleSelect(event, value)}
                    options={["Andrew", "Timothy", "Christine", "Mikhail"]}
                    renderInput={(params) => (
                      <TextField {...params} label="Approver" />
                    )}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={5}
                    size="small"
                    required
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="other-instruction"
                    label="Any Other Instructions For Quoting"
                    variant="outlined"
                    multiline
                    rows={3}
                    size="small"
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="statement"
                    label="Statement For Qualification"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                  <Autocomplete
                    disablePortal
                    id="status"
                    options={["Draft", "Published"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(event, value) => handleSelect(event, value)}
                        label="Status"
                      />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </LocalizationProvider>
        </Dialog>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Paper sx={{ width: "100%", mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow key={1}>
                  <TableCell key={11} sx={{ fontWeight: "bold" }}>
                    RFQ Number
                  </TableCell>
                  <TableCell key={12} sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell key={13} sx={{ fontWeight: "bold" }}>
                    Stage
                  </TableCell>
                  <TableCell key={14} sx={{ fontWeight: "bold" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rfqs.map((rfq) => (
                  <TableRow key={rfq["_id"]}>
                    <TableCell>
                      <Link to={`/rfq/${rfq.rfqNumber}`}>
                        {rfq["rfqNumber"]}
                      </Link>
                    </TableCell>
                    <TableCell>Draft</TableCell>
                    <TableCell>{rfq["RFQstages"]}</TableCell>
                    <TableCell>
                      <Button
                        aria-label="delete"
                        name="delete"
                        onClick={() => handleDelete(rfq.rfqNumber)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};
