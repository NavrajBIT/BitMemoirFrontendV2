"use client";
import Link from "next/link";
import Datafield from "./subcomponents/datafield";
import Spreadsheet from "./subcomponents/spreadsheet";
import useIssue from "./useIssue";
import NotFound from "../subcomponents/errorPages/notFound";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import Alert from "./subcomponents/alert";
import ConfirmPopup from "./subcomponents/confirmPopup";
import ApproverPopup from "./subcomponents/approverPopup";
import NotVerifiedPopup from "./subcomponents/notVerifiedPopup";
import PlanExpired from "../subscriptions/planExpired";

const Issue = ({ params }) => {
  const issue = useIssue(params);

  const isNFTQuotaSufficient =
    issue.nftQuota > 0 && issue.nftQuota >= issue.studentNumber;

  if (issue.notFound) return <NotFound />;

  if (!issue.template)
    return (
      <div
        style={{
          minHeight: "var(--min-height-screen)",
          background: "var(--primary-100)",
        }}
      >
        <LocalLoading text={"Loading"} />
      </div>
    );

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "var(--padding-main)",
      }}
    >
      <Link
        href={"/certificate"}
        style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}
      >
        {"< Back"}
      </Link>

      <Datafield issue={issue} />
      {issue.studentNumber > 0 && <Spreadsheet issue={issue} />}

      {issue.loadingStatus !== "" && (
        <LocalLoading text={issue.loadingStatus} />
      )}
      {issue.popupStatus !== "" && <Alert issue={issue} />}
      {issue.confirmPopup && <ConfirmPopup issue={issue} />}
      {issue.approverPopup && <ApproverPopup issue={issue} />}
      {issue.notVerifiedPopup && <NotVerifiedPopup issue={issue} />}
      {issue.nftQuota !== null && !isNFTQuotaSufficient && <PlanExpired />}
    </div>
  );
};

export default Issue;
