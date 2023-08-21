"use client";
import useOrder from "./useOrder";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import OrderHeading from "./subcomponents/orderHeading";
import Certificates from "./subcomponents/certificates";
import Link from "next/link";
import NotFound from "../subcomponents/errorPages/notFound";

const Order = ({ params }) => {
  const orderer = useOrder(params);

  if (orderer.notFound) return <NotFound />;

  if (orderer.orderDetails === null) {
    return (
      <div style={{ minHeight: "var(--min-height-screen)" }}>
        <LocalLoading text={"Loading order details..."} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <Link
        href={"/dashboard"}
        style={{
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          width: "fit-content",
        }}
      >
        {"< Back"}
      </Link>
      {orderer.templateDetails !== null && <OrderHeading orderer={orderer} />}
      <Certificates orderer={orderer} />
    </div>
  );
};

export default Order;
