import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  CssBaseline,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const RFQInfo = () => {
  //use navigate
  const navigate = useNavigate();

  const { id } = useParams();
  const [rfq, setRfq] = useState({
    rfqNumber: id,
  });
  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        `https://humber-capstone-backend.herokuapp.com/rfqs/findOne?rfqNumber=${id}`
      );
      console.log(response.data);
      setRfq(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [formValue, setformValue] = React.useState({
    rfqNumber: id,
  });

  const handleSubmit = async (e) => {
    // store the states in the form data
    e.preventDefault();

    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url: `https://humber-capstone-backend.herokuapp.com/RFQs/update?rfqNumber=${id}`,
        data: rfq,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValue = (event) => {
    setRfq({
      ...rfq,
      [event.target.name]: event.target.value,
    });
    console.log(rfq);
  };

  React.useEffect(() => {
    sendGetRequest();
  }, []);

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <Typography variant="h4" sx={{ padding: 3 }}>
        {rfq.rfqNumber}
      </Typography>
      <Container sx={{ paddingBottom: 5 }} maxWidth="sm">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 5 }}>
              <TextField
                id="to"
                variant="outlined"
                autoFocus
                required
                name="to"
                size="small"
                value={rfq.to}
                onChange={handleChangeValue}
              />
              <TextField
                id="from"
                variant="outlined"
                required
                size="small"
                name="from"
                value={rfq.from}
                onChange={handleChangeValue}
              />
              <TextField
                id="rfq-date"
                value={rfq.rfqDate}
                variant="outlined"
                required
                disabled
                size="small"
              />
              {console.log(rfq.rfqDate)}

              <TextField
                id="vendor-details"
                variant="outlined"
                size="small"
                required
                name="vendorDetail"
                value={rfq.vendorDetail}
                onChange={handleChangeValue}
              />

              <DesktopDatePicker
                label="Date&Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id="description"
                variant="outlined"
                multiline
                rows={5}
                size="small"
                name="description"
                value={rfq.description}
                onChange={handleChangeValue}
              >
                {rfq.description}
              </TextField>
              <TextField
                id="other-instruction"
                variant="outlined"
                multiline
                rows={3}
                size="small"
                name="instruction"
                value={rfq.instruction}
                onChange={handleChangeValue}
              />
              <TextField
                id="statement"
                variant="outlined"
                size="small"
                name="statement"
                value={rfq.statement}
                onChange={handleChangeValue}
                required
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["Draft", "Published"]}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
              <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                  <Button type="submit">Save</Button>
                </Grid>
                <Grid item xs={8} md={6}>
                  <Button>Cancel</Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </LocalizationProvider>
      </Container>
    </Paper>
  );
};