import { Box, Grid, Paper, Typography } from "@material-ui/core";
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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Hr61IErFiNn0Vo1bKGtqs2nxmrGLYiPn3NoEzlVV1MskMpob0BR6GMx6rgYATXxoUdAO0DSKNqRf5RDQfPRbpfU00sM4aufYg"
);

const Billing = () => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
    <Container maxWidth="lg">
      <Paper>
        <Box sx={{ m: 2 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h6" style={{ paddingTop: "16px" }}>
                Enter payment infromation
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="subtitle1" sx={{ m: 2 }}>
                Subcription price: $20
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  success={() => {
                    setStatus("success");
                  }}
                />
              </Elements>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Billing;
