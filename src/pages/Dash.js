import React, {useEffect, useState} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Paper, Typography, Grid } from '@mui/material';
import axios from 'axios';

const data = {
    labels: ["Comliant", "Non Compliant"],
    datasets: [
        {
            data: [10, 12],
            backgroundColor: ["green", "red"]
        }
    ]
}

const option = {
    title: {
        text:"Compliance"

    }
}


export const Dash = () => {

    const [products,setProducts] = useState('')

    const sendGetRequest = async () => {
        try {
          const response = await axios.get(
            "https://humber-capstone-backend.herokuapp.com/products"
          );
          setProducts(response.data.length)
        } catch (err) {
          console.log(err.message);
        }
      };


    useEffect(() => {
        sendGetRequest();
      }, []);
  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Paper sx={{padding:2}} >
                    <Typography variant='h6'>
                        Total Products
                    </Typography>
                    <Typography variant='h4'>
                        {products}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper sx={{padding:2}} >
                    <div style={{"maxWidth":"700px"}}>
                    <Typography variant='h6'>
                        Compliance chart
                    </Typography>
                    <Pie data={data} option={option} style={{"maxWidth":"500px"}}/>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </div>
  )
}
