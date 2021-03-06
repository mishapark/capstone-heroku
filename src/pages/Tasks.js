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
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { FormattedMessage } from "react-intl";

// hooks
import useAuth from "../hooks/useAuth";

import { getRfqsByUserWithToken } from "../api/rfqs";

export const Tasks = () => {
  // auth
  const { auth } = useAuth();
  const [state, setState] = React.useState("");
  const [rfqs, setRfqs] = React.useState([]);

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
    getRfqsByUserWithToken(auth.accessToken).then((data) => {
      setRfqs(data);
    });
  };

  React.useEffect(() => {
    sendGetRequest();
  }, []);

  return (
        <div>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <Toolbar>
                        <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
                            <FormattedMessage id="Tasks"></FormattedMessage>
                        </Typography>

                        <Tooltip title="Create RFQ">
                            <IconButton size="large">
                                <Badge badgeContent={rfqs.length} color="primary">
                                    <TaskAltIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableRow key={1}>
                                <TableCell key={11}>
                                    <FormattedMessage id="rfq.rfqNumber"></FormattedMessage>
                                </TableCell>
                                <TableCell key={12}>
                                    <FormattedMessage id="rfq.Status"></FormattedMessage>
                                </TableCell>
                                <TableCell key={13}>
                                    <FormattedMessage id="rfq.Stage"></FormattedMessage>
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
