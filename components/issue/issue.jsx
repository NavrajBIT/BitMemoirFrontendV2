"use client";
import Link from "next/link";
import Datafield from "./subcomponents/datafield";
import Spreadsheet from "./subcomponents/spreadsheet";
import useIssue from "./useIssue";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import Alert from "./subcomponents/alert";
import ConfirmPopup from "./subcomponents/confirmPopup";
import ApproverPopup from "./subcomponents/approverPopup";
import SuccessPopup from "./subcomponents/successPopup";
import NotVerifiedPopup from "./subcomponents/notVerifiedPopup";

const Issue = ({ params }) => {
  const issue = useIssue(params);

  if (issue.template === null)
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
      {issue.successPopup && <SuccessPopup issue={issue} />}
    </div>
  );
};

export default Issue;
