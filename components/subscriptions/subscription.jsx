import SubscriptionCard from "./subscriptionCard";

const Subscription = () => {
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
          padding: "var(--padding-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-main)",
          flexWrap: "wrap",
          position: "relative",
          padding: "var(--padding-large)",
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
          Subscription Plans
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            position: "absolute",
            bottom: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          For custom plans, please contact us at support@beimagine.tech
        </div>
        <SubscriptionCard title="Silver" certificates={100} price={2} />
        <SubscriptionCard title="Gold" certificates={500} price={1.75} />
        <SubscriptionCard title="Platinum" certificates={1000} price={1.5} />
      </div>
    </div>
  );
};

export default Subscription;
