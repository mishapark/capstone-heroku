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
import { Button } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
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

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
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
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    sendGetRequest();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={1} sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="compliance.productName"></FormattedMessage>
              </TableCell>
              <TableCell key={2} sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="compliance.status"></FormattedMessage>
              </TableCell>
              <TableCell key={3} sx={{ fontWeight: "bold" }}>
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
                        <Chip label={placeholder} sx={{ color: "#2F7C31" }} />
                      )}
                    </FormattedMessage>
                  ) : (
                    <FormattedMessage id="compliance.status.isNotCompliant">
                      {(placeholder) => (
                        <Chip label={placeholder} sx={{ color: "#2F7C31" }} />
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
