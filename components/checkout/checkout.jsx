"use client";
import { LocalInputField } from "../subcomponents/form/form";
import PayPalCheckout from "../paypal/paypal";
import useCheckout from "./useCheckout";

const Checkout = ({ plan }) => {
  const script = useCheckout();
  const totalPrice =
    script.plans[plan]["certificates"] * script.plans[plan]["price"];
  const discount =
    (script.plans[plan]["certificates"] *
      script.plans[plan]["price"] *
      script.discount) /
    100;
  const netPayable = totalPrice - discount;
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          background: "var(--primary-100)",
          borderRadius: "var(--border-radius)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          position: "relative",
          padding: "var(--padding-large)  var(--padding-main)",
        }}
      >
        <div
          style={{
            width: "100%",
            color: "var(--primary-50)",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            position: "absolute",
            top: "-1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Checkout
        </div>
        <div style={{ fontSize: "2rem" }}>{plan} Subscription</div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 2fr" }}>
          <div>Number of certificates</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{script.plans[plan]["certificates"]}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 2fr" }}>
          <div>Price per certificate</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{script.plans[plan]["price"]} $/certificate</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 2fr" }}>
          <div>Total price</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{totalPrice} $</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 2fr",
            alignItems: "center",
          }}
        >
          <div>Coupon Code</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>
            <LocalInputField
              inputData={{
                label: "Coupon Code",
                type: "text",
              }}
              value={script.coupon}
              handleChange={script.handleCouponChange}
              maxLength={9}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 2fr" }}>
          <div>Discount</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{script.discount} %</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 2fr" }}>
          <div></div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{discount}$</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 2fr",
            borderTop: "1px solid var(--primary-60)",
            borderBottom: "1px solid var(--primary-60)",
            padding: "var(--padding-main) 0px",
          }}
        >
          <div>Net Payable</div>
          <div style={{ textAlign: "center" }}>=</div>
          <div>{netPayable}$</div>
        </div>

        <PayPalCheckout
          totalPrice={netPayable}
          certificates={script.plans[plan]["certificates"]}
          couponCode={script.coupon}
          plan={plan}
        />
      </div>
    </div>
  );
};

export default Checkout;
