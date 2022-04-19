import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import DatePicker from "react-widgets/esm/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import useAuth from "../hooks/useAuth";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { PageHeader } from "../components/Header/PageHeader";
import TaskIcon from "@mui/icons-material/Task";
import { RFQForm } from "../components/RFQ/RFQForm";
import { Divider } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export const TaskInfo = () => {
  //use navigate
  const navigate = useNavigate();
  const { id } = useParams();
  const [rfq, setRfq] = useState({
    rfqNumber: id,
    status: "Draft",
    approver: "Timothy",
  });
  const { auth } = useAuth();

  const [signButtonIsDisabled, setSignButtonIsDisabled] = useState(false);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        `https://humber-capstone-backend.herokuapp.com/rfqs/findOne?rfqNumber=${id}`
      );
      console.log(response.data);
      setRfq(response.data);

      // set sign button visibility
      if (
        response.data.RFQstages === "Completed" ||
        response.data.RFQstages === "Cancelled"
      ) {
        setSignButtonIsDisabled(true);
      } else {
        setSignButtonIsDisabled(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    sendGetRequest();
  }, []);

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

  React.useEffect(() => {
    sendGetRequest();
    getApprovers();
  }, []);

  const handleDate = (e) => {
    const newData = { ...rfq };
    newData["quoteRequiredBy"] = e;
    setValue(e);
    setRfq(newData);
    console.log(rfq);
  };

  // docusign
  const [docusignUrl, setDocusignUrl] = useState("");
  const handleSignRfq = (event) => {
    //setSignButtonIsDisabled(true)
    // TODO change to actual url and actual client ID
    axios
      .post(`https://humber-capstone-backend.herokuapp.com/docusigns`, {
        client_id: "a48595f9-11ad-47d2-8824-e4049b580426",
        rfq_number: rfq.rfqNumber,
      })
      .then((res) => {
        setDocusignUrl(res.data);
        console.log(res.data);
        //window.location.assign(res.data);
        window.open(res.data, "_blank");
      });
  };

  const handlePreviewSignDocument = (event) => {
    window.open(
      `https://humber-capstone-backend.herokuapp.com/docusigns/` +
        rfq.docusignEnvelopeId
    );
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Grid container style={{ padding: "16px" }}>
          <Grid item container>
            <Grid item xs={12}>
              <PageHeader
                icon={<TaskIcon />}
                title={rfq.rfqNumber}
                description="Tasks to approve"
              ></PageHeader>
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
                        {!signButtonIsDisabled && (
                          <Button onClick={handleSignRfq} variant="outlined">
                            Sign RFQ
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        {signButtonIsDisabled && (
                          <Button
                            onClick={handlePreviewSignDocument}
                            variant="outlined"
                          >
                            <FormattedMessage id="tasks.previewDocument"></FormattedMessage>
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          onClick={() => navigate("/tasks")}
                          variant="outlined"
                        >
                          <FormattedMessage id="cancelBtn"></FormattedMessage>
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
