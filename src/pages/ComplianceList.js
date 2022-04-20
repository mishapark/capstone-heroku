import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Alert, Button, Stack } from "@mui/material";
import { Chip } from "@mui/material";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { getProductsWithToken } from "../api/products";
import useAuth from "../hooks/useAuth";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@mui/icons-material/Done";
import { AddCompliance } from "../components/Compliance/AddCompliance";
import ListIcon from "@mui/icons-material/List";

const EnhancedTableToolbar2 = ({ handleClickOpen }) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <FormattedMessage id="Compliance List"></FormattedMessage>
      </Typography>
    </Toolbar>
  );
};

export default function ComplainceList() {
  const [products, setProducts] = React.useState([]);

  const { auth, setAuth } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar2 handleClickOpen={handleClickOpen} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={1}>
                <FormattedMessage id="Reference ID"></FormattedMessage>
              </TableCell>
              <TableCell key={2}>
                <FormattedMessage id="Regulatory Authority"></FormattedMessage>
              </TableCell>
              <TableCell key={3}>
                <FormattedMessage id="Applied Standard"></FormattedMessage>
              </TableCell>
              <TableCell key={4}>
                <FormattedMessage id="Sub Sections"></FormattedMessage>
              </TableCell>
              <TableCell key={5}>
                <FormattedMessage id="Start Date"></FormattedMessage>
              </TableCell>
              <TableCell key={6}>
                <FormattedMessage id="End Date"></FormattedMessage>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Paper>
    </Box>
  );
}