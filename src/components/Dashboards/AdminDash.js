import React, { useEffect, useState } from "react";

import axios from "axios";
import { Grid, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { height } from "@mui/system";
import ReactTooltip from "react-tooltip";
export const AdminDash = () => {
  const [subscrubers, setSubscrubers] = useState([]);

  const [monthRevenue, setMonthRevenue] = useState([]);
  const [averageRevenue, setAverageRevenue] = useState([]);
  const [churn, setChurn] = useState({});
  const [yearRevenue, setYearRevenue] = useState();
  const getAllSubscrubers = async () => {
    try {
      const response = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash"
      );
      const response2 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/geography"
      );
      const response3 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/month_revenue"
      );
      const response4 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/month_revenue"
      );
      const response5 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/annual_revenue"
      );

      setSubscrubers(response.data);
      setSubGeo(response2.data);
      setMonthRevenue(response3.data);
      setAverageRevenue(response4.data);
      console.log(response4);
      setYearRevenue(response4.data);
      setChurn({
        active:
          response5.data[0].active_memebr_count_thisYear[0].Active_member_count,
        notActive:
          response5.data[0].unactive_member_count[0].No_Active_member_count,
      });
      console.log(response4.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllSubscrubers();
  }, []);

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const [content, setContent] = useState("");
  const [subGeo, setSubGeo] = useState([]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">All subscrubers</Typography>
            <Typography variant="h4">{subscrubers.length}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Monthly Recurring Revenue</Typography>
            <Typography variant="h4">${monthRevenue.result}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average revenue</Typography>
            <Typography variant="h4">${averageRevenue.result}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Annually recurring revenue</Typography>
            <Typography variant="h4">${averageRevenue.result}</Typography>
            <br />
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Churn rate</Typography>
            <br />
            <Typography variant="body1">
              Active members: <b>{churn.active}</b>
            </Typography>
            <Typography variant="body1">
              Not active members: <b>{churn.notActive}</b>
            </Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={12} justifyContent="center">
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Subscrubers by Geography</Typography>
            <ReactTooltip>{content}</ReactTooltip>
            <ComposableMap
              data-tip=""
              style={{
                maxHeight: "600px",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        onMouseEnter={() => {
                          const { NAME } = geo.properties;
                          subGeo.map((subG) => {
                            if (subG._id === NAME) {
                              const count = subG.count;
                              setContent(`${NAME} (${count} subscrubers)`);
                            }
                          });
                        }}
                        onMouseLeave={() => {
                          setContent("");
                        }}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#D6D6DA",
                            outline: "none",
                          },
                          hover: {
                            fill: "#0024FF",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </Paper>
          <br></br>
        </Grid>
      </Grid>
    </div>
  );
};
