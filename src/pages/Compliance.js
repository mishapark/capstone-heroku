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

const EnhancedTableToolbar = ({ handleClickOpen }) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <FormattedMessage id="Compliance Central"></FormattedMessage>
      </Typography>
      <Stack spacing={2} direction="row">
        <Tooltip title="Get compliance">
          <Button variant="outlined">
            <ListIcon />
            <Link to="/compliancelist">Compliances</Link>
          </Button>
        </Tooltip>
        <Tooltip title="Add compliance">
          <Button variant="outlined" onClick={handleClickOpen}>
            <AddIcon />
            <FormattedMessage id="rfq.createBtn"></FormattedMessage>
          </Button>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
};

export default function Compliance() {
  const [products, setProducts] = React.useState([]);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/products"
      );
      setProducts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const { auth, setAuth } = useAuth();

  React.useEffect(() => {
    getProductsWithToken(auth.accessToken).then((data) => {
      setProducts(data);
    });
  }, []);

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
        <EnhancedTableToolbar handleClickOpen={handleClickOpen} />
        <AddCompliance
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        ></AddCompliance>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={1}>
                <FormattedMessage id="compliance.productName"></FormattedMessage>
              </TableCell>
              <TableCell key={2}>
                <FormattedMessage id="compliance.status"></FormattedMessage>
              </TableCell>
              <TableCell key={3}>
                <FormattedMessage id="compliance.documents"></FormattedMessage>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product["product_id"]}>
                <TableCell>
                  <Link to={`../products/${product["_id"]}`}>
                    {product["product_details"]["product_name"]}
                  </Link>
                </TableCell>
                <TableCell>
                  {product.is_compliant ? (
                    <FormattedMessage id="compliance.status.isCompliant">
                      {(placeholder) => (
                        <Chip
                          label={placeholder}
                          deleteIcon={<DoneIcon />}
                          sx={{ color: "#2F7C31" }}
                        />
                      )}
                    </FormattedMessage>
                  ) : (
                    <FormattedMessage id="compliance.status.isNotCompliant">
                      {(placeholder) => (
                        <Chip label={placeholder} sx={{ color: "#ff5151" }} />
                      )}
                    </FormattedMessage>
                  )}
                </TableCell>
                <TableCell>
                  {product.marking_and_doc.marking_plate.map((file) => (
                    <Typography>
                      <AttachFileIcon />
                      <a
                        href={`https://humber-capstone-backend.herokuapp.com/files/${file.file_location}`}
                        target="_blank"
                      >
                        {file.name}
                      </a>
                    </Typography>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
