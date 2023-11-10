import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import t from "./translation";

const NoqrPopup = ({ creator, ln }) => {
  const router = useRouter();
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          gap: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          {t["No QR code"][ln]}
        </div>
        <div>{t["QrpopDesc"][ln]}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <Button
              text={t["Continue"][ln]}
              variant={"secondary"}
              onClick={() => {
                creator.setNoQR(false);
                router.back();
              }}
            />
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              text={t["addQR"][ln]}
              variant={"primary"}
              onClick={() => {
                creator.setNoQR(false);
                creator.addQrcode();
              }}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default NoqrPopup;
