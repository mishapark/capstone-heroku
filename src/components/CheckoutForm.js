import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm({ success, payment, companyId }) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(payment);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          "https://humber-capstone-backend.herokuapp.com/payments/charge",
          {
            id,
            amount: payment.amount,
            plan: payment.plan,
            companyId: companyId,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(data);
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button type="submit" className="pay-button" disabled={!stripe}>
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
