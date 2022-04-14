import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/system";
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

export const UserDash = ({ products, data, option, d2, o2 }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, maxWidth: "580px" }}>
            <Typography variant="h6">
              <FormattedMessage id="dash.total"></FormattedMessage>
            </Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Paper>
          <br></br>
          <Paper sx={{ padding: 2, maxWidth: "580px", minHeight: "338px" }}>
            <div>
              <Typography variant="h6">
                <FormattedMessage id="dash.rfqOverview"></FormattedMessage>
              </Typography>
              <Pie
                data={d2}
                option={o2}
                style={{ maxWidth: "500px", height: "300px" }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, maxWidth: "700px", minHeight: "413px" }}>
            <div style={{ maxWidth: "700px" }}>
              <Typography variant="h6">
                <FormattedMessage id="dash.complaince"></FormattedMessage>
              </Typography>
              <Pie data={data} option={option} style={{ maxWidth: "500px" }} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, maxWidth: "1000px" }}>
            <Typography variant="h6">
              <FormattedMessage id="dash.renewals"></FormattedMessage>
            </Typography>
            <br />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="dash.products.Product"></FormattedMessage>
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="dash.products.Category"></FormattedMessage>
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="dash.products.ProductFamily"></FormattedMessage>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(0, 5).map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>
                      <Link to={`/products/${product._id}`}>
                        {product.product_details.product_name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {product.product_details.product_category}
                    </TableCell>
                    <TableCell>
                      {product.product_details.product_family}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br></br>
            <Link color="primary" to="/products" sx={{ mt: 3, color: "blue" }}>
              <FormattedMessage id="dash.seeAllProducts"></FormattedMessage>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
