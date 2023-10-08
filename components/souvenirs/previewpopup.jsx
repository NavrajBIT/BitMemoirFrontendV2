import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import Image from "next/image";

const PreviewPopup = ({ script }) => {
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width-form)",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          borderRadius: "var(--border-radius)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          alignItems: "center",
          minWidth: "50vw",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
          Preview
        </div>
        <div
          style={{ width: "100%", aspectRatio: "4/3", position: "relative" }}
        >
          <Image fill src={script.image} alt="souvenir" />
          {script.selectedFrame && (
            <Image fill src={script.selectedFrame.frame_image} alt="frame" />
          )}
        </div>

        <Button
          text={"OK"}
          variant={"primary"}
          onClick={() => script.setPreviewPopup(false)}
        />
      </div>
    </Popup>
  );
};

export default PreviewPopup;
