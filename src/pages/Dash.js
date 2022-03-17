import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/system";
import { Paper, Typography, Grid } from "@mui/material";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

export const Dash = () => {
  const [products, setProducts] = useState([]);
  const [rfqs, setRfqs] = useState([]);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/products"
      );
      setProducts(response.data);
      const response2 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/rfqs"
      );
      setRfqs(response2.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  const data = {
    labels: ["Comliant", "Non Compliant"],
    datasets: [
      {
        data: [
          products.filter((product) => product.is_compliant === true).length,
          products.filter((product) => product.is_compliant === false).length,
        ],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const option = {
    title: {
      text: "Compliance",
    },
  };

  const d2 = {
    labels: ["Initiated", "In progress", "Completed"],
    datasets: [
      {
        data: [
          rfqs.filter((rfq) => rfq.RFQstages === "Initiated").length,
          rfqs.filter((rfq) => rfq.RFQstages === "Processing").length,
          rfqs.filter((rfq) => rfq.RFQstages === "Completed").length,
        ],
        backgroundColor: ["blue", "green", "yellow"],
      },
    ],
  };

  const o2 = {
    title: {
      text: "RFQs",
    },
  };
  const refresh = useRefreshToken();

  return (
    <div>
      <button onClick={() => refresh()}>Refresh</button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Paper>
          <br></br>
          <Paper sx={{ padding: 2 }}>
            <div style={{ maxWidth: "700px" }}>
              <Typography variant="h6">RFQs Overview</Typography>
              <Pie data={d2} option={o2} style={{ maxWidth: "500px" }} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <div style={{ maxWidth: "700px" }}>
              <Typography variant="h6">Compliance chart</Typography>
              <Pie data={data} option={option} style={{ maxWidth: "500px" }} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
