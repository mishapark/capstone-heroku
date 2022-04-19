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
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Divider } from "@material-ui/core";
import { PageHeader } from "../components/Header/PageHeader";
import { RFQForm } from "../components/RFQ/RFQForm";

export const RFQInfo = () => {
  //use navigate
  const navigate = useNavigate();

  const { id } = useParams();
  const [rfq, setRfq] = useState({
    rfqNumber: id,
    status: "Draft",
    approver: "Timothy",
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
    console.log(rfq);
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
      }).then(navigate("/rfq"));
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

  const handleSelect = (e, value) => {
    setRfq({
      ...rfq,
      ["status"]: value,
    });
    console.log(rfq);
  };

  const handleApprover = (e, value) => {
    setRfq({
      ...rfq,
      ["approver"]: value,
    });
    console.log(rfq);
    console.log(value);
  };

  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [approvers, setApprovers] = React.useState([]);

  const getApprovers = async () => {
    try {
      const response = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/rfqs/findApprovers"
      );
      console.log(response.data);
      setApprovers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDate = (e) => {
    const newData = { ...rfq };
    setValue(e);
    newData["quoteRequiredBy"] = e;
    setRfq(newData);
    console.log(rfq);
  };

  React.useEffect(() => {
    sendGetRequest();
    getApprovers();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper square={false}>
        <Grid container style={{ padding: "16px" }}>
          <Grid item container>
            <Grid item xs={12}>
              <PageHeader
                icon={<ReceiptIcon />}
                title={rfq.rfqNumber}
                description="Detailed Information"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              container
              item
              style={{
                paddingLeft: "16px",
                paddingTop: "16px",
              }}
            >
              <Grid item xs={12} spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <form onSubmit={handleSubmit}>
                    <RFQForm
                      rfq={rfq}
                      handleChangeValue={handleChangeValue}
                      handleDate={handleDate}
                      value={value}
                      approvers={approvers}
                      handleSelect={handleSelect}
                      handleApprover={handleApprover}
                    ></RFQForm>
                    <Grid container spacing={0} justifyContent="flex-end">
                      <Grid item xs={1.5}>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => navigate("/rfq")}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
