import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../issue.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotVerifiedPopup = ({ issue }) => {
  return (
    <Popup>
      <div className={style.confirmContainer}>
        <div className={style.sectionDark}>
          <div style={{ fontSize: "1.5rem", color: "red" }}>Not Verified</div>
          <Image
            src={"/icons/unverified.svg"}
            height={200}
            width={200}
            alt="unverified"
          />
          <div style={{ fontSize: "1.25rem", color: "var(--primary-50)" }}>
            These certificates are not verified
          </div>
        </div>

        <div style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
          Total number of certificates: {issue.studentNumber}
        </div>

        <ButtonContainer issue={issue} />
      </div>
    </Popup>
  );
};

export default NotVerifiedPopup;

const ButtonContainer = ({ issue }) => {
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
          text="Apply for KYC"
          variant="primary"
          onClick={() => {
            router.push("/kyc/status");
          }}
        />
      </div>
      <div style={{ width: "fit-content", minWidth: "40%" }}>
        <Button
          text="Continue anyway >"
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
