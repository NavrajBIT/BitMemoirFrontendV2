import API from "@/components/subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";
import Button from "@/components/subcomponents/button/button";
import t from "../translation";

const Approval = ({ orderer, ln }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--primary-100)",
        padding: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "var(--padding-light)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "1.5rem",
          fontWeight: "bold",
          top: "-1rem",
          left: "var(--padding-main)",
          color: "var(--primary-50)",
        }}
      >
        {t["Approvals"][ln]}
      </div>
      {orderer.orderDetails.approvals.map((approval, index) => (
        <ApprovalCard
          key={"approval-status-" + index}
          approval={approval}
          orderer={orderer}
        />
      ))}
    </div>
  );
};

export default Approval;

const ApprovalCard = ({ approval, orderer }) => {
  const api = API();
  const [isApprover, setIsApprover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkApprover = () => {
    api
      .crud("GET", "/user/email")
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          let userEmail = res[0].email;
          if (userEmail === approval.approver.email) {
            setIsApprover(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkApprover();
  }, []);

  const approve = async () => {
    setIsLoading(true);
    await api
      .crud("PATCH", `/certificate/approve/${approval.id}`, {
        is_approved: true,
      })
      .then((res) => {
        orderer.poppulateOrderDetails();
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <div
      style={{
        border: "1px solid var(--primary-50)",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-light)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
      }}
    >
      <div style={{ fontSize: "1.25rem" }}>{approval.approver.name}</div>
      <div>
        <div style={{ color: "var(--primary-50)" }}>Designation:</div>
        <div>{approval.approver.designation}</div>
      </div>
      <div>
        <div style={{ color: "var(--primary-50)" }}>Email:</div>
        <div>{approval.approver.email}</div>
      </div>
      <div>
        <div style={{ color: "var(--primary-50)" }}>Status:</div>
        <div>{approval.is_approved ? "Approved" : "Pending"}</div>
      </div>
      {isApprover && !approval.is_approved && (
        <Button
          variant="primary"
          text="Approve"
          endIcon={"done"}
          isLoading={isLoading}
          onClick={approve}
        />
      )}
    </div>
  );
};
