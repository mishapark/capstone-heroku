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
import { getComplianceWithToken } from "../api/compliances";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [compliances, setCompliances] = React.useState([]);

  const { auth, setAuth } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getComplianceWithToken(auth.accessToken).then((data) =>
      setCompliances(data)
    );
  }, []);

  const handleDelete = (compliance) => {
    axios
      .delete(
        `https://humber-capstone-backend.herokuapp.com/compliances/delete?report_number=${compliance}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(function (response) {
        window.location.reload();
      });
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
                <FormattedMessage id="Record Type"></FormattedMessage>
              </TableCell>
              <TableCell key={5}>
                <FormattedMessage id="Start Date"></FormattedMessage>
              </TableCell>
              <TableCell key={6}>
                <FormattedMessage id="End Date"></FormattedMessage>
              </TableCell>
              <TableCell key={7}>
                <FormattedMessage id="Delete"></FormattedMessage>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compliances.map((complaince) => (
              <TableRow>
                <TableCell>{complaince.report_number}</TableCell>
                <TableCell>{complaince.regulatory_authority}</TableCell>
                <TableCell>{complaince.regulatory_authority}</TableCell>
                <TableCell>{complaince.record_type.record_type}</TableCell>
                <TableCell>{complaince.start_date}</TableCell>
                <TableCell>{complaince.end_date}</TableCell>
                <TableCell>
                  <Button
                    aria-label="delete"
                    name="delete"
                    onClick={() => handleDelete(complaince.report_number)}
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
  );
}
