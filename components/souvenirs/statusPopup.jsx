import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";

const StatusPopup = ({ script }) => {
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
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
          {script.status}
        </div>

        <Button
          text={"OK"}
          variant={"primary"}
          onClick={() => script.setStatus("")}
        />
      </div>
    </Popup>
  );
};

export default StatusPopup;
