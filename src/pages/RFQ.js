import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Card, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar, Tooltip } from "@mui/material";
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
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormattedMessage } from "react-intl";

// hooks
import useAuth from "../hooks/useAuth";

// api
import { getRfqsWithToken, getRfqsApproversWithToken } from "../api/rfqs";

export const RFQ = () => {
  // auth
  const { auth } = useAuth();

  const [state, setState] = React.useState("");

  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const user_id = "620c6a949115e6ac657a4607";

  const [rfqs, setRfqs] = React.useState([]);
  const [approvers, setApprovers] = React.useState([]);

  const sendGetRequest = async () => {
    /*try {
            const response = await axios.get(
                "https://humber-capstone-backend.herokuapp.com/rfqs"
            );
            console.log(response.data);
            setRfqs(response.data);
        } catch (err) {
            console.log(err.message);
        }*/

    getRfqsWithToken(auth.accessToken).then((data) => {
      setRfqs(data);
    });
  };

  const getApprovers = async () => {
    /*try {
            const response = await axios.get(
                "https://humber-capstone-backend.herokuapp.com/rfqs/findApprovers"
            );
            console.log(response.data);
            setApprovers(response.data);
        } catch (err) {
            console.log(err);
        }*/
    getRfqsApproversWithToken(auth.accessToken).then((data) => {
      setApprovers(data);
    });
  };
  React.useEffect(() => {
    sendGetRequest();
    getApprovers();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();
  const [newRfq, setNewRfq] = useState({
    user_id: "620c6a949115e6ac657a4607",
  });

  const [value, setValue] = React.useState(null);

  const handleInput = (e) => {
    const newData = { ...newRfq };
    newData[e.target.name] = e.target.value;
    setNewRfq(newData);
    console.log(newRfq);
  };

  const handleSelect = (e, value) => {
    const newData = { ...newRfq };
    newData["approver"] = value;
    setNewRfq(newData);
    console.log(newData);
  };

  const handleStatus = (e, value) => {
    const newData = { ...newRfq };
    newData["status"] = value;
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
    console.log(newRfq);

    e.preventDefault();
    axios
      .post(`https://humber-capstone-backend.herokuapp.com/rfqs/add`, newRfq, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": auth.accessToken,
        },
      })
      .then(function (response) {
        if (response.data.message === "Sucessfully Submitted") {
          setOpen(false);
          window.location.reload(true);
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
        window.location.reload();
      });
  };

  const handleDate = (e) => {
    const newData = { ...newRfq };
    setValue(e);
    newData["quoteRequiredBy"] = e;
    setNewRfq(newData);
    console.log(newRfq);
  };
  return (
    <>
      <Stack spacing={2}>
        <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmitData}>
              <DialogTitle>Create new RFQ</DialogTitle>
              <DialogContent sx={{ minWidth: "700px" }}>
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
                    name="to"
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="from"
                    label="From"
                    variant="outlined"
                    required
                    size="small"
                    name="from"
                    onChange={(e) => handleInput(e)}
                  />
                  <TextField
                    id="rfq-date"
                    label={date}
                    variant="outlined"
                    required
                    disabled
                    size="small"
                    name="rfqDate"
                    onChange={(e) => handleInput(e)}
                  />

                  <TextField
                    id="vendor-details"
                    label="Vendor Details"
                    variant="outlined"
                    name="vendorDetail"
                    size="small"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                  <DesktopDatePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={(e) => handleDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <Autocomplete
                    disablePortal
                    id="approver"
                    name="approver"
                    onInputChange={(event, value) => handleSelect(event, value)}
                    options={approvers.map((e) => e.userName)}
                    renderInput={(params) => (
                      <TextField {...params} label="Approver" />
                    )}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    name="description"
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
                    name="instruction"
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
                    name="statement"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                  <Autocomplete
                    disablePortal
                    id="status"
                    name="status"
                    options={["Draft", "Published"]}
                    onInputChange={(event, value) => handleStatus(event, value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </LocalizationProvider>
        </Dialog>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Paper sx={{ width: "100%", mt: 2 }}>
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flex: "1 1 100%" }}
              >
                <FormattedMessage id="RFQ Manager"></FormattedMessage>
              </Typography>
              <Tooltip title="Create RFQ">
                <Button onClick={handleClickOpen} variant="outlined">
                  <AddIcon />
                  <FormattedMessage id="rfq.createBtn"></FormattedMessage>
                </Button>
              </Tooltip>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow key={1}>
                  <TableCell key={11}>
                    <FormattedMessage id="rfq.rfqNumber"></FormattedMessage>
                  </TableCell>
                  <TableCell key={12}>
                    <FormattedMessage id="rfq.date"></FormattedMessage>
                  </TableCell>
                  <TableCell key={13}>
                    <FormattedMessage id="rfq.description"></FormattedMessage>
                  </TableCell>
                  <TableCell key={14}>
                    <FormattedMessage id="rfq.Status"></FormattedMessage>
                  </TableCell>
                  <TableCell key={15}>
                    <FormattedMessage id="rfq.Stage"></FormattedMessage>
                  </TableCell>
                  <TableCell key={16}>
                    <FormattedMessage id="rfq.Delete"></FormattedMessage>
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
                    <TableCell>
                      {rfq.rfqDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}/)}
                    </TableCell>
                    <TableCell>{rfq.description}</TableCell>
                    <TableCell>{rfq.status}</TableCell>
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
