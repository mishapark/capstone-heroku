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
import { TurnOver } from "./TurnOver";

export const AdminDash = () => {
  const [subscrubers, setSubscrubers] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [averageRevenue, setAverageRevenue] = useState([]);
  const [churn, setChurn] = useState();
  const [yearRevenue, setYearRevenue] = useState([]);
  const [turnOver, setTurnOver] = useState({ lastMonth: 0, thisMonth: 0 });

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
      console.log(response6);
      setTurnOver({
        thisMonth:
          response6.data[0].thisMonth_memebr_count[0]
            .thisMonth_Active_member_count,
        lastMonth:
          response6.data[0].lastMonth_member_count[0]
            .lastMonth_Active_member_count,
      });
      setChurn(
        (response6.data[0].thisMonth_memebr_count[0]
          .thisMonth_Active_member_count -
          response6.data[0].lastMonth_member_count[0]
            .lastMonth_Active_member_count) /
          response6.data[0].lastMonth_member_count[0]
            .lastMonth_Active_member_count
      );
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
            <Typography variant="h6">All subscribers</Typography>
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
          <Paper sx={{ padding: 2, height: "250px" }}>
            <Typography variant="h6">Average Monthly Revenue</Typography>
            <Typography variant="h4">${averageRevenue}</Typography>
          </Paper>
          <br></br>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, height: "250px" }}>
            <Typography variant="h6">Churn rate</Typography>
            <Grid container direction="row">
              <Grid item xs={12} md={3}>
                <Typography variant="body1">
                  <br />
                  <Typography variant="h6">Rate: {churn}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <TurnOver
                  thisMonth={turnOver.thisMonth}
                  lastMonth={turnOver.lastMonth}
                ></TurnOver>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} justifyContent="center">
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Subscribers by Geography</Typography>
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
