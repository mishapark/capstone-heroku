import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
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
  const [rfq, setRfq] = useState("");
  const { id } = useParams();

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
          <Stack spacing={2} sx={{ mt: 5 }}>
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
              defaultValue={rfq.rfqDate}
              variant="outlined"
              required
              disabled
              size="small"
            />

            <TextField
              id="vendor-details"
              defaultValue={rfq.vendorDetail}
              variant="outlined"
              size="small"
              required
            />
            <DesktopDatePicker
              label="Date&Time picker"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              id="description"
              defaultValue={rfq.description}
              variant="outlined"
              multiline
              rows={5}
              size="small"
            >
              {rfq.description}
            </TextField>
            <TextField
              id="other-instruction"
              defaultValue={rfq.instruction}
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Draft", "Published"]}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
            <Grid container spacing={2}>
              <Grid item xs={8} md={6}>
                <Button>Save</Button>
              </Grid>
              <Grid item xs={8} md={6}>
                <Button>Cancel</Button>
              </Grid>
            </Grid>
          </Stack>
        </LocalizationProvider>
      </Container>
    </Paper>
  );
};
