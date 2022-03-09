import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { Box } from "@mui/system";
import { Paper, Typography, Grid } from "@mui/material";
import axios from "axios";
import { Button, Card, Container} from "@material-ui/core";
import { Stack } from "@mui/material";
import DropdownList from "react-widgets/DropdownList";


const data = {
  labels: ["Comliant", "Non Compliant"],
  datasets: [
    {
      data: [10, 12],
      backgroundColor: ["green", "red"],
    },
  ],
};

const option = {
  title: {
    text: "Compliance",
  },
};



function Analytics() {
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

  const d2 = {
    labels: ["Initiated", "In progress", "Completed"],
    datasets: [
      {
        data: [rfqs.filter((rfq) => rfq.RFQstages === "Initiated").length, 
        rfqs.filter((rfq) => rfq.RFQstages === "Processing").length,
        rfqs.filter((rfq) => rfq.RFQstages === "Completed").length],
        backgroundColor: ["orange", "green", "blue"],
      },
    ],
  };

  
  const o2 = {
    title: {
      text: "RFQs",
    },
  };
  return (
  <Stack spacing={2}>
      <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" sx={{padding:2}}>Analytics</Typography>
         
        </Card>
        <Grid container>
          <Grid item xs={12} md={6}>
          <Card
        >
          <Typography variant="h6" sx={{padding:2}}>Products by Standard</Typography>
          <Box sx={{width:"350px", padding:2}}>
          <DropdownList
                      placeholder="Select category"
                      data={[]}
                    /> <br/>
                    <DropdownList
                      placeholder="Select standard"
                      data={[]}
                    />
          </Box>
          
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
        </Card>
          </Grid>
          <br></br>
          <Grid item xs={12} md={6}>
          <Card
        >
          <Typography variant="h6" sx={{padding:2}}>Products by Compliance</Typography>
          <Pie data={data} option={option} height="200px"
  width="200px"
  options={{ maintainAspectRatio: false }}/>
        </Card>
          </Grid>
          <Grid item xs={12} md={6}>
          <Card
        >
          <Typography variant="h6" sx={{padding:2}}>RFQ by Product</Typography>
          <Typography variant="subtitle1" sx={{padding:2}}>N/A</Typography>
        </Card>
          </Grid>
          <Grid item xs={12} md={6}>
          <Card
        >
          <Typography variant="h6" sx={{padding:2}}>RFQ Overview by Status</Typography>
          <Doughnut data={d2} option={o2} height="200px"
  width="200px"
  options={{ maintainAspectRatio: false }}/>
        </Card>
          </Grid>
        </Grid>
       
       
       
      
    </Stack>
    );
}

export default Analytics;
