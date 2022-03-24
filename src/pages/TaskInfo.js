import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import DatePicker from "react-widgets/esm/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import useAuth from "../hooks/useAuth";

export const TaskInfo = () => {
  //use navigate
  const navigate = useNavigate();
  const [rfq, setRfq] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();

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

  return (
    <Paper>
      <Typography variant="h4" sx={{ padding: 3 }}>
        {rfq.rfqNumber}
      </Typography>
      <Container sx={{ paddingBottom: 5 }} maxWidth="sm">
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
            label={rfq.rfqDate}
            variant="outlined"
            required
            disabled
            size="small"
          />

          <TextField
            id="vendor-details"
            value={rfq.vendorDetail}
            variant="outlined"
            size="small"
            required
          />
          <DatePicker placeholder="Date Required By" value={rfq.date} />
          {console.log(auth)}
          <TextField
            id="description"
            value={rfq.description}
            variant="outlined"
            multiline
            rows={5}
            size="small"
          >
            {" "}
            {rfq.description}{" "}
          </TextField>
          <TextField
            id="other-instruction"
            value={rfq.instruction}
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
          <DropdownList placeholder="Status" data={["Draft", "Published"]} />
          <Button variant="outlined">Sign RFQ</Button>
        </Stack>
      </Container>
    </Paper>
  );
};
