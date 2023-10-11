"use client";
import { useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";

const PayPalCheckout = ({ totalPrice, certificates, couponCode, plan }) => {
  const api = API();
  const router = useRouter();
  useEffect(() => {
    // Replace with your PayPal client ID
    const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    // Initialize PayPal script
    const script = document.createElement("script");
    // Initialize PayPal script with currency parameter
    script.src =
      "https://www.paypal.com/sdk/js?client-id=" + CLIENT_ID + "&currency=USD";

    script.async = true;

    script.onload = () => {
      // PayPal SDK has loaded; you can now use it
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            // Set up the order details (amount, currency, etc.)
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: `${totalPrice}`, // Replace with your product price
                    currency_code: "USD",
                  },
                },
              ],
              application_context: {
                // Set return and cancel URLs
                return_url: process.env.NEXT_PUBLIC_URL, // Replace with your success URL
                cancel_url: process.env.NEXT_PUBLIC_URL, // Replace with your cancel URL
              },
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(async function (details) {
              try {
                api
                  .crud("POST", "subscription", {
                    payment_id: details.id,
                    promocode: couponCode,
                    cert_number: certificates,
                    plan_name: plan,
                  })
                  .then((res) => {
                    console.log(res);
                    if (res.status >= 200 && res.status <= 299) {
                      router.back();
                    }
                  });
              } catch (error) {
                console.error("Error:", error);
              }
            });
          },
        })
        .render("#paypal-button-container");
    };

    // Append the script to the document
    document.body.appendChild(script);
  }, [totalPrice]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div id="paypal-button-container" style={{ width: "100%" }}></div>
    </div>
  );
};

export default PayPalCheckout;
