import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";

const NoqrPopup = ({ creator }) => {
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
          No QR code
        </div>
        <div>
          The certificate does not have a qr code. A QR code makes the
          certificate verifiable.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <Button
              text="< Continue"
              variant={"secondary"}
              onClick={() => {
                creator.setNoQR(false);
                router.back();
              }}
            />
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              text="Add Qr"
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
