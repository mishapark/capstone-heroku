import React, { useEffect, useRef, useState } from "react";
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
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import ProductsDash from "../components/Dashboards/ProductsDash";
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import useAuth from "../hooks/useAuth";
import { UserDash } from "../components/Dashboards/UserDash";
import { AdminDash } from "../components/Dashboards/AdminDash";

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

  const { auth } = useAuth();

  return (
    <div>
      {auth.roles.includes("Super_Admin") ? (
        <AdminDash />
      ) : (
        <UserDash
          products={products}
          data={data}
          option={option}
          d2={d2}
          o2={o2}
        />
      )}
    </div>
  );
};
