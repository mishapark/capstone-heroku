import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { Box } from "@mui/system";
import { Paper, Typography, Grid, Toolbar, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";
import { Button, Card, Container } from "@material-ui/core";
import { Stack } from "@mui/material";
import DropdownList from "react-widgets/DropdownList";

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import { getStandards } from "../api/standards";

import ProductsByStandard from '../components/AnalyticsData/ProductsByStandard';
import ProductsByCompliance from '../components/AnalyticsData/ProductsByCompliance';
import RfqOverviewByStatus from '../components/AnalyticsData/RfqOverviewByStatus';

function Analytics() {
    const [products, setProducts] = useState([]);
    const [rfqs, setRfqs] = useState([]);
    const [analyticsTabValue, setAnalyticsTabValue] = useState("1");

    const [standards, setStandards] = useState([]);

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
        getStandards().then((data) => setStandards(data));
    }, []);

    

    const handleAnalyticsTabChange = (event, value) => {
        setAnalyticsTabValue(value)

        switch (value) {
            case '1':
                return 'bar';

            case '2':
                return 'bar';
            default:
                return 'foo';
        }

    }

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
                <Typography variant="h5" sx={{ padding: 2 }}>Analytics</Typography>



            </Card>

            <Card sx={{overflow: "visible"}}>
                <TabContext value={analyticsTabValue}>
                    <Tabs
                        value={analyticsTabValue}
                        onChange={handleAnalyticsTabChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        centered
                    >
                        <Tab value="1" label="Products by Standard" />
                        <Tab value="2" label="Products by Compliance" />
                        <Tab value="3" label="RFQ Overview by Status" />
                    </Tabs>

                    <TabPanel value="1">
                        {/*<Typography variant="h6" sx={{ padding: 2 }}>Products by Standard</Typography>*/}
                        <ProductsByStandard data={standards} />                        
                    </TabPanel>

                    <TabPanel value="2">
                        {/*<Typography variant="h6" sx={{ padding: 2 }}>Products by Compliance</Typography>*/}
                        <ProductsByCompliance />  
                    </TabPanel>
                    
                    <TabPanel value="3">
                        {/*<Typography variant="h6" sx={{ padding: 2 }}>RFQ Overview by Status</Typography>*/}
                        <RfqOverviewByStatus/>
                    </TabPanel>

                </TabContext>

            </Card>
            {/*
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Card
                    >
                        <Typography variant="h6" sx={{ padding: 2 }}>Products by Standard</Typography>
                        <Box sx={{ width: "350px", padding: 2 }}>
                            <DropdownList
                                placeholder="Select category"
                                data={[]}
                            /> <br />
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
                        <Typography variant="h6" sx={{ padding: 2 }}>Products by Compliance</Typography>
                        <Pie data={data} option={option} height="200px"
                            width="200px"
                            options={{ maintainAspectRatio: false }} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                    >
                        <Typography variant="h6" sx={{ padding: 2 }}>RFQ by Product</Typography>
                        <Typography variant="subtitle1" sx={{ padding: 2 }}>N/A</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                    >
                        <Typography variant="h6" sx={{ padding: 2 }}>RFQ Overview by Status</Typography>
                        <Doughnut data={d2} option={o2} height="200px"
                            width="200px"
                            options={{ maintainAspectRatio: false }} />
                    </Card>
                </Grid>
            </Grid>

            */}


        </Stack>
    );
}

export default Analytics;
