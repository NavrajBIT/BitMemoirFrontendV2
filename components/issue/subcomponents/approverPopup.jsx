import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../issue.module.css";
import { useRouter } from "next/navigation";

const ApproverPopup = ({ issue, ln }) => {
  return (
    <Popup>
      <div className={style.confirmContainer}>
        <div className={style.sectionDark}>
          <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
            {ln === "en" && "Approver"}
            {ln === "es" && "Aprobador"}
            {ln === "ar" && "الموافق"}
          </div>
          <div style={{ fontSize: "1.25rem", color: "var(--primary-50)" }}>
            {ln === "en" && "Approvers will approve the certificate issuance"}
            {ln === "es" &&
              "Los aprobadores aprobarán la emisión del certificado."}
            {ln === "ar" && "سيوافق الموافقون على إصدار الشهادة"}
          </div>
        </div>
        <div className={style.sectionLight}>
          <div className={style.sectionHeading}>
            {ln === "en" && "Select Approver"}
            {ln === "es" && "Seleccionar aprobador"}
            {ln === "ar" && "حدد المعتمد"}
          </div>
          <ApproverSelector issue={issue} />
        </div>
        <div style={{ color: "red" }}>
          {issue.selectedApprovers.length === 0 &&
            ln === "en" &&
            "Please select atleast one approver."}
          {issue.selectedApprovers.length === 0 &&
            ln === "es" &&
            "Por favor seleccione al menos un aprobador."}
          {issue.selectedApprovers.length === 0 &&
            ln === "ar" &&
            "الرجاء تحديد معتمد واحد على الأقل."}
        </div>
        <ButtonContainer issue={issue} ln={ln} />
      </div>
    </Popup>
  );
};

export default ApproverPopup;

const ApproverSelector = ({ issue }) => {
  const router = useRouter();
  const addApprover = (approver) => {
    if (issue.selectedApprovers.includes(approver)) return;
    issue.setSelectedApprovers((prev) => {
      let newApprovers = [...prev];
      newApprovers.push(approver);
      return newApprovers;
    });
  };
  const removeApprover = (approver) => {
    if (!issue.selectedApprovers.includes(approver)) return;
    issue.setSelectedApprovers((prev) => {
      let newApprovers = [];
      prev.map((app, index) => {
        if (app !== approver) newApprovers.push(app);
      });

      return newApprovers;
    });
  };

  return (
    <div
      className={style.selector}
      style={{ flexDirection: "column", fontSize: "1.25rem" }}
    >
      <div>Selected Approvers:</div>
      {issue.selectedApprovers.length > 0 ? (
        <SelectedApprovers issue={issue} removeApprover={removeApprover} />
      ) : (
        <div>---</div>
      )}
      <div>Available Approvers:</div>
      {issue.approver.approversList &&
      issue.approver.approversList.length > 0 ? (
        <UnSelectedApprovers issue={issue} addApprover={addApprover} />
      ) : (
        <div>---</div>
      )}
      <Button
        variant={"secondary"}
        text={"Add Approver +"}
        onClick={() => {
          issue.downloadcsv();
          router.push(`/${ln}/approver`);
        }}
      />
    </div>
  );
};

const SelectedApprovers = ({ issue, removeApprover }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--padding-light)",
      padding: "var(--padding-light)",
      fontSize: "1.25rem",
      border: "1px solid var(--primary-60)",
      borderRadius: "var(--border-radius)",
      background: "var(--primary-100)",
    }}
  >
    {issue.selectedApprovers.map((approver, index) => (
      <div
        key={"selected-approver-" + index}
        onClick={() => removeApprover(approver)}
        style={{
          border: "1px solid var(--primary-50)",
          borderRadius: "var(--border-radius)",
          padding: "var(--padding-light)",
          background: "var(--primary-90)",
        }}
      >
        {approver.name}
        {"(" + approver.designation + ")"}
      </div>
    ))}
  </div>
);
const UnSelectedApprovers = ({ issue, addApprover }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--padding-light)",
      padding: "var(--padding-light)",
      fontSize: "1.25rem",
      border: "1px solid var(--primary-60)",
      borderRadius: "var(--border-radius)",
      background: "var(--primary-100)",
    }}
  >
    {issue.approver.approversList.map((approver, index) => {
      if (issue.selectedApprovers.includes(approver)) return null;
      return (
        <div
          key={"selected-approver-" + index}
          onClick={() => addApprover(approver)}
          style={{
            border: "1px solid var(--primary-50)",
            borderRadius: "var(--border-radius)",
            padding: "var(--padding-light)",
            width: "fit-content",
            background: "var(--primary-90)",
          }}
        >
          {approver.name}
          {"(" + approver.designation + ")"}
        </div>
      );
    })}
  </div>
);

const ButtonContainer = ({ issue, ln }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--padding-main)",
    }}
  >
    <div style={{ width: "fit-content", minWidth: "40%" }}>
      <Button
        text={ln === "en" ? "X Cancel" : ln === "es" ? "X Cancelar" : "X إلغاء"}
        variant="secondary"
        onClick={() => {
          issue.setApproverPopup(false);
          issue.setConfirmPopup(false);
        }}
      />
    </div>
    {issue.selectedApprovers.length !== 0 && (
      <div style={{ width: "fit-content", minWidth: "40%" }}>
        <Button
          text={
            ln === "en" ? "Issue >" : ln === "es" ? "Problema >" : "المشكلة >"
          }
          variant="primary"
          onClick={() => {
            issue.placeOrder();
          }}
        />
      </div>
    )}
  </div>
);
