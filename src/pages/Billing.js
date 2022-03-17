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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51KeOQoLRE6j3B7vaxcTYB870BBGSPy7K6YeAZ4jhXnJl9w8D6VPMRcPRyDshfNOhQhrTNxbpss1wLh4abDUZlIFV00L8Dlk5fP"
);

function Billing() {
  return (
    <Container>
      <form>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </form>
    </Container>
  );
}

export default Billing;
