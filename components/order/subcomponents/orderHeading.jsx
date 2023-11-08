import Button from "@/components/subcomponents/button/button";
import Image from "next/image";

const OrderHeading = ({ orderer }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--primary-100)",
        padding: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--padding-light)",
      }}
    >
      <div>
        <Image
          src={
            orderer.templateDetails.icon !== null
              ? orderer.templateDetails.icon
              : "/icons/imageplaceholder.svg"
          }
          loader={() =>
            orderer.templateDetails.icon !== null
              ? orderer.templateDetails.icon
              : "/icons/imageplaceholder.svg"
          }
          alt={"Certificate"}
          width={200}
          height={150}
          style={{ borderRadius: "var(--border-radius)" }}
        />
      </div>
      <div>
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          {orderer.templateDetails.name}
        </div>
        <div>submitted: {orderer.orderDetails.datetime}</div>
        <div style={{ color: "var(--primary-50)" }}>
          status: {orderer.orderDetails.modelStatus.toUpperCase()}
        </div>
        <div>Order Id: {orderer.orderDetails.id}</div>
        {orderer.orderDetails.modelStatus === "pending" && (
          <Button
            variant="primary"
            text="Issue >>"
            onClick={orderer.issueOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrderHeading;
