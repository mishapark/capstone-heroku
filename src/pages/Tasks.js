import {
  Paper,
  Card,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Badge,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const Tasks = () => {
  const [state, setState] = React.useState("");
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

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">Tasks</Typography>
        <Badge badgeContent={rfqs.length} color="primary">
          <TaskAltIcon />
        </Badge>
      </Card>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rfqs
                .filter((rfq) => rfq.status == "Published")
                .map((rfq) => (
                  <TableRow key={rfq["_id"]}>
                    <TableCell>
                      <Link to={`/tasks/${rfq.rfqNumber}`}>
                        {rfq["rfqNumber"]}
                      </Link>
                    </TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell>{rfq["RFQstages"]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
};
