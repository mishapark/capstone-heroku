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
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { TasksBreakdown } from "../Dashboards/TasksBreakdown";
import AlertDash from "./AlertDash";

export const UserDash = ({
  products,
  data,
  option,
  d2,
  o2,
  rfq,
  compliances,
}) => {
  const now = new Date();
  const current = now.getMonth() + 1;

  const [open, setOpen] = React.useState(true);

  return (
    <div>
      {/* <AlertDash open={open} setOpen={setOpen}></AlertDash> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: 2, height: "350px" }}>
            <Typography variant="h6">
              <FormattedMessage id="dash.total"></FormattedMessage>
            </Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ padding: 2, height: "350px" }}>
            <div style={{ width: "99%" }}>
              <Typography variant="h6">
                <FormattedMessage id="dash.complaince"></FormattedMessage>
              </Typography>
              <Pie
                data={data}
                height="200px"
                width="200px"
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: 2, height: "350px" }}>
            <Typography variant="h6">
              <FormattedMessage id="dash.rfqOverview"></FormattedMessage>
            </Typography>
            <Pie
              data={d2}
              option={o2}
              style={{ maxWidth: "500px", height: "300px" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ padding: 2, height: "350px" }}>
            <Typography variant="h6">Tasks Breakdown</Typography>
            <div style={{ height: "200px" }}>
              <TasksBreakdown tasks={rfq} style={{ height: "200px" }} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">
              <FormattedMessage id="dash.renewals"></FormattedMessage>
            </Typography>
            <br />
            {console.log(current)}
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
                  <TableCell>Expiery Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
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
                    <TableCell>
                      {compliances.map((compliance) => {
                        if (
                          compliance.report_number.includes(
                            product.compliance_report_number
                          )
                        ) {
                          return compliance.end_date.match(
                            /^\d{4}\-\d{1,2}\-\d{1,2}/
                          );
                        }
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                {/* {products.map((product) => {
                  compliances.map((compliance) => {
                    if (
                      compliance.report_number.includes(
                        product.compliance_report_number
                      )
                    ) {
                      const d = new Date(compliance.end_date);
                      d.getMonth() == current ? (
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
                          <TableCell>{compliance.end_date}</TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell>LOL</TableCell>
                        </TableRow>
                      );
                    }
                  });
                })} */}
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
