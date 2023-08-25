import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";

const TermsPopup = () => {
  const router = useRouter();
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--padding-main)",
          gap: "var(--padding-light)",
          background: "var(--primary-100)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          Terms and Conditions
        </div>
        <div>The certificates in free trial are not verified without KYC.</div>
        <div style={{ width: "fit-content" }}>
          <Button
            text="Complete KYC"
            variant={"primary"}
            onClick={() => router.push("/kyc")}
          />
        </div>
        <div style={{ width: "fit-content" }}>
          <Button
            text="Continue Anyway"
            variant={"secondary"}
            onClick={() => router.push("/certificate")}
            endIcon={"arrow-right"}
          />
        </div>
      </div>
    </Popup>
  );
};

export default TermsPopup;
