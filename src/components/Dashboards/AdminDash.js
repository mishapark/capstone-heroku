import React, { useEffect, useState } from "react";

import axios from "axios";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { height } from "@mui/system";
import ReactTooltip from "react-tooltip";
import { MonthlyRevenueDash } from "./MonthlyRevenueDash";
import { AnnualRevenueDash } from "./AnnualRevenueDash";
import { SubscribersTable } from "./SubscribersTable";

export const AdminDash = () => {
  const [subscrubers, setSubscrubers] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [averageRevenue, setAverageRevenue] = useState([]);
  const [churn, setChurn] = useState({});
  const [yearRevenue, setYearRevenue] = useState([]);
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
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/avg_revenue"
      );
      const response5 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/annual_revenue"
      );
      const response6 = await axios.get(
        "https://humber-capstone-backend.herokuapp.com/admin_dashboards/dash/cust_turnover"
      );

      setSubscrubers(response.data);
      setSubGeo(response2.data);
      setMonthRevenue(response3.data);
      setAverageRevenue(response4.data[0].totalPayment);
      setYearRevenue(response5.data);
      console.log(response5);
      setChurn({
        active:
          response6.data[0].active_memebr_count_thisYear[0].Active_member_count,
        notActive:
          response6.data[0].unactive_member_count[0].No_Active_member_count,
      });
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
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, height: "300px" }}>
            <Typography variant="h6">All subscrubers</Typography>
            <Typography variant="h4">{subscrubers.length}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, height: "300px" }}>
            <Typography variant="h6">Monthly Recurring Revenue</Typography>
            <MonthlyRevenueDash revenue={monthRevenue}></MonthlyRevenueDash>
          </Paper>
          <br></br>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, height: "300px" }}>
            <Typography variant="h6">Annual Recurring Revenue</Typography>
            <AnnualRevenueDash revenue={yearRevenue}></AnnualRevenueDash>
            <br />
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, height: "200px" }}>
            <Typography variant="h6">Average Monthly Revenue</Typography>
            <Typography variant="h4">${averageRevenue}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, height: "200px" }}>
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
            <Grid container direction="row">
              <Grid item xs={12} md={7}>
                <ReactTooltip>{content}</ReactTooltip>
                <ComposableMap
                  data-tip=""
                  style={{
                    maxHeight: "600px",
                    maxWidth: "1000px",
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
                            onClick={() => {
                              const { NAME } = geo.properties;
                              setFilteredSub([]);
                              setFilteredSub(
                                subscrubers.filter((sub) => {
                                  if (sub.company_country == NAME) {
                                    return sub;
                                  }
                                })
                              );
                              setIsShown(true);
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
              </Grid>
              <Grid item xs={12} md={5}>
                {console.log(subscrubers)}
                {isShown ? (
                  <SubscribersTable
                    subscrubers={filteredSub}
                  ></SubscribersTable>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </Paper>
          <br></br>
        </Grid>
      </Grid>
    </div>
  );
};
