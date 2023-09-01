import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../issue.module.css";
import Image from "next/image";

const ConfirmPopup = ({ issue }) => {
  return (
    <Popup>
      <div className={style.confirmContainer}>
        <div className={style.sectionDark}>
          <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
            Certificate Details
          </div>
          <div style={{ fontSize: "1.25rem", color: "var(--primary-50)" }}>
            {issue.template.name}
          </div>
        </div>
        <div className={style.imageContainer}>
          <Image
            src={
              issue.template.icon !== null
                ? issue.template.icon
                : "/icons/imageplaceholder.svg"
            }
            loader={() =>
              issue.template.icon !== null
                ? issue.template.icon
                : "/icons/imageplaceholder.svg"
            }
            alt={"Certificate"}
            fill={true}
            className={style.previewimage}
          />
        </div>
        <div style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
          Total number of certificates: {issue.studentNumber}
        </div>

        <TypeSelector issue={issue} />
        <DeploymentSelector issue={issue} />
        <ButtonContainer issue={issue} />
      </div>
    </Popup>
  );
};

export default ConfirmPopup;

const TypeSelector = ({ issue }) => (
  <div className={style.sectionLight}>
    <div className={style.sectionHeading}>Certificate type</div>
    <div className={style.selector}>
      <input
        type="checkbox"
        checked={issue.certType === "essential"}
        onChange={() =>
          issue.setcertType((prev) => {
            if (prev === "essential") return "nonessential";
            if (prev === "nonessential") return "essential";
          })
        }
      />
      Essential (Degree Certificates)
    </div>
    <div className={style.selector}>
      <input
        type="checkbox"
        checked={issue.certType === "nonessential"}
        onChange={() =>
          issue.setcertType((prev) => {
            if (prev === "essential") return "nonessential";
            if (prev === "nonessential") return "essential";
          })
        }
      />
      Non Essential (Diploma Certificates)
    </div>
  </div>
);

const DeploymentSelector = ({ issue }) => (
  <div className={style.sectionLight}>
    <div className={style.sectionHeading}>Deployment type</div>
    <div className={style.selector}>
      <input
        type="checkbox"
        checked={issue.deploymentType === "static"}
        onChange={() =>
          issue.setDeploymentType((prev) => {
            if (prev === "static") return "dynamic";
            if (prev === "dynamic") return "static";
          })
        }
      />
      Static
    </div>
    <div className={style.selector}>
      <input
        type="checkbox"
        checked={issue.deploymentType === "dynamic"}
        onChange={() =>
          issue.setDeploymentType((prev) => {
            if (prev === "dynamic") return "static";
            if (prev === "static") return "dynamic";
          })
        }
      />
      Dynamic
    </div>
  </div>
);
const ButtonContainer = ({ issue }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--padding-main)",
      gap: "var(--padding-main)",
    }}
  >
    <div style={{ width: "fit-content", minWidth: "40%" }}>
      <Button
        text="X Cancel"
        variant="secondary"
        onClick={() => {
          issue.setApproverPopup(false);
          issue.setConfirmPopup(false);
        }}
      />
    </div>
    <div style={{ width: "fit-content", minWidth: "40%" }}>
      <Button
        text="Issue >"
        variant="primary"
        onClick={() => {
          if (issue.certType === "essential") {
            issue.setApproverPopup(true);
            issue.setConfirmPopup(false);
            return;
          }
          issue.placeOrder();
        }}
      />
    </div>
  </div>
);
