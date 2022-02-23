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
import axios from 'axios';




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
        Compliance Center
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
        'https://humber-capstone-backend.herokuapp.com/products'
      );
      console.log(response.data)
      setProducts(response.data);
      setIsLoading(false);
      
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
        <Table className="mb-0">
      <TableHead>
        <TableRow>
            <TableCell key={1} sx={{'fontWeight':'bold'}}>Product name</TableCell>
            <TableCell key={2} sx={{'fontWeight':'bold'}}>Compliance status</TableCell>
            <TableCell key={3} sx={{'fontWeight':'bold'}}>Documents</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product["product_id"]}>
            <TableCell>{product["product_details"]["product_name"]}</TableCell>
            <TableCell>
              <Button
                size="small"
                color="primary"
                variant="contained"
                disabled
                sx={{
                  borderRadius:'12px'
                }}
              >
                Yes
              </Button>
            </TableCell>
            <TableCell>{product["product_details"]["product_name"]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </Paper>
    </Box>
  );
}
