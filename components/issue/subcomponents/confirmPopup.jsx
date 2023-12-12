import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../issue.module.css";
import Image from "next/image";

const ConfirmPopup = ({ issue, ln }) => {
  return (
    <Popup>
      <div className={style.confirmContainer}>
        <div className={style.sectionDark}>
          <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
            {ln === "en" && "Certificate Details"}
            {ln === "es" && "Detalles del certificado"}
            {ln === "ar" && "تفاصيل الشهادة"}
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
          {ln === "en" && "Total number of certificates:"}
          {ln === "es" && "Número total de certificados:"}
          {ln === "ar" && "إجمالي عدد الشهادات:"} {issue.studentNumber}
        </div>

        <TypeSelector issue={issue} ln={ln} />
        <DeploymentSelector issue={issue} ln={ln} />
        <ButtonContainer issue={issue} ln={ln} />
      </div>
    </Popup>
  );
};

export default ConfirmPopup;

const TypeSelector = ({ issue, ln }) => (
  <div className={style.sectionLight}>
    <div className={style.sectionHeading}>
      {ln === "en" && "Certificate type"}
      {ln === "es" && "Tipo de certificado"}
      {ln === "ar" && "نوع الشهادة"}
    </div>
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
      {ln === "en" && "Essential (Degree Certificates)"}
      {ln === "es" && "Second key (Certificados de Grado)"}
      {ln === "ar" && "أساسي (شهادات الدرجة)"}
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
      {ln === "en" && "Non Essential (Diploma Certificates)"}
      {ln === "es" && "First key (Certificados de Diploma)"}
      {ln === "ar" && "غير أساسية (شهادات الدبلوم)"}
    </div>
  </div>
);

const DeploymentSelector = ({ issue, ln }) => (
  <div className={style.sectionLight}>
    <div className={style.sectionHeading}>
      {ln === "en" && "Deployment type"}
      {ln === "es" && "Tipo de implementación"}
      {ln === "ar" && "نوع النشر"}
    </div>
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
      {ln === "en" && "Static"}
      {ln === "es" && "Estático"}
      {ln === "ar" && "ثابتة"}
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
      {ln === "en" && "Dynamic"}
      {ln === "es" && "Dinámico"}
      {ln === "ar" && "متحرك"}
    </div>
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
      gap: "var(--padding-main)",
    }}
  >
    <div style={{ width: "fit-content", minWidth: "40%" }}>
      <Button
        text={ln === "en" ? "Cancel" : ln === "es" ? "Cancelar" : "يلغي"}
        variant="secondary"
        onClick={() => {
          issue.setApproverPopup(false);
          issue.setConfirmPopup(false);
        }}
      />
    </div>
    <div style={{ width: "fit-content", minWidth: "40%" }}>
      <Button
        text={ln === "en" ? "Issue >" : ln === "es" ? "Emitir >" : "المشكلة >"}
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
