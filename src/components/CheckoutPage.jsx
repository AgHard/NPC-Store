// src/pages/CheckoutPage.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY"); // replace this

const CheckoutPage = () => {
  const location = useLocation();
  const subtotal = location.state?.subtotal || 0;

  return (
    <div className="min-h-screen px-4 pt-24 mt-8 text-white bg-black">
      <div className="max-w-2xl mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={subtotal} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
