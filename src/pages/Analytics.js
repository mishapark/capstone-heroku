import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Toolbar, IconButton } from "@mui/material";
import axios from "axios";
import { Button, Card, Container } from "@mui/material";
import { Stack } from "@mui/material";
import DropdownList from "react-widgets/DropdownList";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { getStandards } from "../api/standards";

import ProductsByStandard from "../components/AnalyticsData/ProductsByStandard";
import ProductsByCompliance from "../components/AnalyticsData/ProductsByCompliance";
import RfqOverviewByStatus from "../components/AnalyticsData/RfqOverviewByStatus";
import { FormattedMessage } from "react-intl";

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
    setAnalyticsTabValue(value);

    switch (value) {
      case "1":
        return "bar";

      case "2":
        return "bar";
      default:
        return "foo";
    }
  };

  return (
    <Stack spacing={2}>
      <Paper>
        <Toolbar>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
            <FormattedMessage id="Analytics"></FormattedMessage>
          </Typography>
        </Toolbar>

        <Card sx={{ overflow: "visible" }}>
          <TabContext value={analyticsTabValue}>
            <Tabs
              value={analyticsTabValue}
              onChange={handleAnalyticsTabChange}
              textColor="primary"
              indicatorColor="primary"
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
              <RfqOverviewByStatus />
            </TabPanel>
          </TabContext>
        </Card>
      </Paper>
    </Stack>
  );
}

export default Analytics;
