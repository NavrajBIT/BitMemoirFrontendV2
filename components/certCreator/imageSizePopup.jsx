import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import Image from "next/image";
import t from "./translation";

const ImageSizePopup = ({ creator, ln }) => {
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width-form)",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          gap: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          {t["Low quality Image"][ln]}
        </div>
        <Image
          src={"/icons/warning.svg"}
          alt="Warning"
          height={200}
          width={200}
        />
        <div>{t["The selected image is of low quality."][ln]}</div>
        <div>
          {t["Background images should be 1080px X 810px in size."][ln]}
        </div>
        <div>
          {
            t[
              "A low quality image can be unreadable and can render the QR codes unscannable."
            ][ln]
          }
        </div>

        <div style={{ width: "fit-content" }}>
          <Button
            text={t["I understand"][ln]}
            variant={"primary"}
            onClick={() => {
              creator.setImageQualityPopup(false);
            }}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ImageSizePopup;
