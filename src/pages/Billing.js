import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import {
  CardElement,
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import React, { useEffect, useState } from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import { PageHeader } from "../components/Header/PageHeader";
import useAuth from "../hooks/useAuth";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Hr61IErFiNn0Vo1bKGtqs2nxmrGLYiPn3NoEzlVV1MskMpob0BR6GMx6rgYATXxoUdAO0DSKNqRf5RDQfPRbpfU00sM4aufYg"
);

const Billing = () => {
  const { auth } = useAuth();
  const [status, setStatus] = React.useState("ready");
  const [companyId, setCompanyId] = React.useState(
    localStorage.getItem("companyId")
  );
  const [paymenet, setPayment] = React.useState({
    amount: "",
    plan: "",
  });

  const role = auth.roles[0];

  const d = new Date();
  const month = d.getMonth();

  const handleChange = (event) => {
    setPayment({
      amount: event.target.value,
      plan: event.target.name,
      month: month,
    });
    console.log(paymenet);
  };

  if (status === "alive") {
    return (
      <Container maxWidth="lg">
        <Paper>
          <Box style={{ margin: "2em", minHeight: "200px" }}>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h6" style={{ paddingTop: "16px" }}>
                  Thank you for the payment!
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }

  const icon = <PaymentsIcon />;
  return (
    <Container maxWidth="xl">
      <Paper square={false}>
        {role === "Admin" ? (
          auth.subscriptionStatus === "alive" ? (
            <Box style={{ margin: "2em", minHeight: "200px" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography variant="h6" style={{ paddingTop: "16px" }}>
                    Your subscription is active
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container style={{ padding: "16px" }}>
              <Grid item container>
                <Grid item xs={12}>
                  <PageHeader
                    icon={icon}
                    title="Billing"
                    description="Please, select the plan and the payment card"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid
                  container
                  item
                  style={{
                    paddingLeft: "16px",
                    paddingTop: "16px",
                  }}
                >
                  <Grid item xs={6}>
                    <Typography variant="h6">Select plan</Typography>
                    <FormControl
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: "16px",
                        paddingTop: "16px",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Subcription
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={paymenet.amount}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1000"
                          name="Standard"
                          control={<Radio />}
                          label="Standard - $10"
                        />
                        <FormControlLabel
                          value="2000"
                          name="Professional"
                          control={<Radio />}
                          label="Professional - $20"
                        />
                        <FormControlLabel
                          value="3000"
                          name="Enterprise"
                          control={<Radio />}
                          label="Enterprise - $30"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} sx={{ m: 2 }}>
                    <Typography variant="h6">Payment Card</Typography>
                    <Typography variant="body2">
                      Enter the card number
                    </Typography>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        companyId={companyId}
                        payment={paymenet}
                        success={() => {
                          setStatus(auth.subscriptionStatus);
                        }}
                      />
                    </Elements>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        ) : (
          <Paper>
            <Box style={{ margin: "2em", minHeight: "200px" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h6"
                    style={{ paddingTop: "16px", textAlign: "center" }}
                  >
                    <p>This page is only for administrators</p>
                    <p>
                      Please, contact your admin or send the message to{" "}
                      <a href="mailto:connect@alchimetis.com">
                        connect@alchimetis.com
                      </a>
                    </p>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}
        {}
      </Paper>
    </Container>
  );
};

export default Billing;
