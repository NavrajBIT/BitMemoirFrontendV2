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

const Dashboard = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
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
        usedash.issuerDetails && <Heading usedash={usedash} ln={ln} />}
      <Subscriptions usedash={usedash} ln={ln} />
      <Tabs usedash={usedash} ln={ln} />
      {usedash.selectedTab === "Profile" && (
        <>
          {usedash.organizationDetails && (
            <Organization usedash={usedash} ln={ln} />
          )}
          {usedash.issuerDetails && (
            <Representative usedash={usedash} ln={ln} />
          )}
          <Approvers usedash={usedash} ln={ln} />
        </>
      )}
      {usedash.selectedTab === "Orders" && <Orders usedash={usedash} ln={ln} />}
      {usedash.selectedTab === "Certificates" && (
        <Certificates usedash={usedash} ln={ln} />
      )}
    </div>
  );
};

export default Dashboard;
