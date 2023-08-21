import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";

const Alert = ({ issue }) => {
  return (
    <Popup>
      <div
        style={{
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "var(--max-width-form)",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
          {issue.popupStatus}
        </div>
        <div style={{ width: "fit-content" }}>
          <Button
            text="OK"
            variant="primary"
            onClick={() => issue.setPopupStatus("")}
          />
        </div>
      </div>
    </Popup>
  );
};

export default Alert;
