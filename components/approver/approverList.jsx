import Button from "../subcomponents/button/button";
import t from "./translation";

const ApproverList = ({ script, ln }) => {
  return (
    <div
      style={{
        background: "var(--primary-100)",
        maxWidth: "var(--max-width)",
        padding: "var(--padding-main)",
        margin: "auto",
        borderRadius: "var(--border-radius)",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1rem",
          left: "var(--padding-main)",
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          fontWeight: "700",
        }}
      >
        {t[ln]["Approvers"]}
      </div>
      {script.approversList.map((approver, index) => (
        <ApproverCard
          key={"approver-" + index}
          approver={approver}
          script={script}
          ln={ln}
        />
      ))}
    </div>
  );
};

export default ApproverList;

export const ApproverCard = ({ approver, script, ln }) => {
  return (
    <div
      style={{
        background: "var(--primary-90)",
        padding: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "var(--padding-main)",
        width: "300px",
        height: "300px",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>
        {approver.name}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        <div>
          <div>{t[ln]["Designation"] + ":"}</div>
          <div style={{ fontSize: "1.25rem" }}>{approver.designation}</div>
        </div>
        <div>
          <div>{t[ln]["Email"] + ":"}</div>
          <div style={{ fontSize: "1.25rem" }}>{approver.email}</div>
        </div>
      </div>

      <Button
        text={t[ln]["Delete"]}
        variant="secondary"
        endIcon="delete"
        onClick={() => script.deleteApprover(approver)}
      />
    </div>
  );
};
