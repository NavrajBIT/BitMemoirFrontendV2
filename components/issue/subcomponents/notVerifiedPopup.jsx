import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../issue.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotVerifiedPopup = ({ issue, ln }) => {
  return (
    <Popup>
      <div className={style.confirmContainer}>
        <div className={style.sectionDark}>
          <div style={{ fontSize: "1.5rem", color: "red" }}>
            {ln === "en" && "Not Verified"}
            {ln === "es" && "No verificado"}
            {ln === "ar" && "لم يتم التحقق منها"}
          </div>
          <Image
            src={"/icons/unverified.svg"}
            height={200}
            width={200}
            alt="unverified"
          />
          <div style={{ fontSize: "1.25rem", color: "var(--primary-50)" }}>
            {ln === "en" && "These certificates are not verified"}
            {ln === "es" && "Estos certificados no están verificados."}
            {ln === "ar" && "لم يتم التحقق من هذه الشهادات"}
          </div>
        </div>

        <div style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
          {ln === "en" && "Total number of certificates:"}
          {ln === "es" && "Número total de certificados:"}
          {ln === "ar" && "إجمالي عدد الشهادات:"} {issue.studentNumber}
        </div>

        <ButtonContainer issue={issue} ln={ln} />
      </div>
    </Popup>
  );
};

export default NotVerifiedPopup;

const ButtonContainer = ({ issue, ln }) => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--padding-main)",
        gap: "var(--padding-main)",
      }}
    >
      <div style={{ width: "fit-content", minWidth: "40%" }}>
        <Button
          text={
            ln === "en"
              ? "Apply for KYC"
              : ln === "es"
              ? "Solicitar KYC"
              : "التقدم بطلب للحصول على KYC"
          }
          variant="primary"
          onClick={() => {
            router.push(`/${ln}/kyc/status`);
          }}
        />
      </div>
      <div style={{ width: "fit-content", minWidth: "40%" }}>
        <Button
          text={
            ln === "en"
              ? "Continue anyway >"
              : ln === "es"
              ? "Continuar de todos modos >"
              : "استمر على أية حال >"
          }
          variant="secondary"
          onClick={() => {
            issue.setNotVerifiedPopup(false);
            issue.issueCertificates();
          }}
        />
      </div>
    </div>
  );
};
