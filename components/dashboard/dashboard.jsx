"use client";
import usedashboard from "./usedashboard";
import Heading from "./subcomponents/heading";
import Organization from "./subcomponents/organization";
import Representative from "./subcomponents/representative";
import Approvers from "./subcomponents/approvers";
import Tabs from "./subcomponents/tabs";
import Orders from "./subcomponents/orders";
import Certificates from "./subcomponents/certificates";
import Loading from "../subcomponents/loadingPage/loading";
import Subscriptions from "./subcomponents/subscriptions";

const Dashboard = () => {
  const usedash = usedashboard();

  if (usedash.isLoading) return <Loading />;

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-large)",
      }}
    >
      {usedash.accountDetails &&
        usedash.emailDetails &&
        usedash.kycDetails &&
        usedash.issuerDetails && <Heading usedash={usedash} />}
      <Subscriptions usedash={usedash} />
      <Tabs usedash={usedash} />
      {usedash.selectedTab === "Profile" && (
        <>
          {usedash.organizationDetails && <Organization usedash={usedash} />}
          {usedash.issuerDetails && <Representative usedash={usedash} />}
          <Approvers usedash={usedash} />
        </>
      )}
      {usedash.selectedTab === "Orders" && <Orders usedash={usedash} />}
      {usedash.selectedTab === "Certificates" && (
        <Certificates usedash={usedash} />
      )}
    </div>
  );
};

export default Dashboard;
