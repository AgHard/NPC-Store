import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardHolder,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(totalAmount * 100), // amount in cents
        paymentMethodId: paymentMethod.id,
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert("Payment successful!");
    } else {
      setError(result.message || "Payment failed");
    }

    setLoading(false);
  };

  const stripeInputStyle = {
    base: {
      iconColor: '#ffc107',
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#bbb',
      },
    },
    invalid: {
      color: '#ff6f61',
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#111] rounded-2xl shadow-lg w-full max-w-md mx-auto text-white font-sans border border-yellow-500"
    >
      <h1 className="mb-6 text-3xl font-bold text-center">Checkout</h1>

      <div className="mb-4 text-3xl font-semibold text-center text-yellow-400">
        {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} EGP
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button type="button" disabled className="px-4 py-2 text-white bg-yellow-700 rounded-lg cursor-not-allowed opacity-60">PayPal</button>
        <button type="button" className="px-4 py-2 font-bold text-black bg-yellow-400 rounded-lg shadow-md">Credit</button>
        <button type="button" disabled className="px-4 py-2 text-white bg-yellow-700 rounded-lg cursor-not-allowed opacity-60">Wallet</button>
      </div>

      <div className="mb-4 space-y-4">
        <label className="block">
          <span className="block mb-1 text-sm text-gray-300">Card number</span>
          <div className="p-3 bg-gray-900 border border-yellow-500 rounded-lg">
            <CardNumberElement options={{ style: stripeInputStyle }} />
          </div>
        </label>

        <div className="flex gap-4">
          <label className="w-1/2">
            <span className="block mb-1 text-sm text-gray-300">Expiry Date</span>
            <div className="p-3 bg-gray-900 border border-yellow-500 rounded-lg">
              <CardExpiryElement options={{ style: stripeInputStyle }} />
            </div>
          </label>
          <label className="w-1/2">
            <span className="block mb-1 text-sm text-gray-300">CVV</span>
            <div className="p-3 bg-gray-900 border border-yellow-500 rounded-lg">
              <CardCvcElement options={{ style: stripeInputStyle }} />
            </div>
          </label>
        </div>

        <label className="block">
          <span className="block mb-1 text-sm text-gray-300">Card holder</span>
          <input
            type="text"
            placeholder="Your name and surname"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full p-3 text-white bg-gray-900 border border-yellow-500 rounded-lg"
          />
        </label>
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="text-sm text-gray-300">Save card data for future payments</label>
        <input type="checkbox" className="w-5 h-5 text-yellow-500 form-checkbox" checked readOnly />
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 font-bold text-center text-black transition bg-yellow-400 rounded-2xl hover:bg-yellow-300"
      >
        {loading ? "Processing..." : "Proceed to confirm"}
      </button>
    </form>
  );
};

export default CheckoutForm;
