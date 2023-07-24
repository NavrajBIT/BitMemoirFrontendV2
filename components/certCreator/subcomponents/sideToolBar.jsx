import SideTool from "./sideTool";

const SideToolBar = ({ creator }) => {
  return (
    <div>
      <div
        style={{
          padding: "var(--padding-light)",
          background: "rgba(0,0,0,0.3)",
          borderRadius: "var(--border-radius)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        <SideTool
          icon="text"
          toolName="Add Text"
          toolDescription="Add permanent text on the certificate template"
        />
        <SideTool
          icon="select"
          toolName="Select"
          toolDescription="Select objects to move or delete"
        />
        <SideTool
          icon="add_image"
          toolName="Add Logo"
          toolDescription="Add logo on the certificate template"
        />
        <SideTool
          icon="variable"
          toolName="Variable"
          toolDescription="Add variable on the certificate template. Variable values can vary on different certificate issuances. e.g. Student Name"
        />
        <SideTool
          icon="qr"
          toolName="QR Code"
          toolDescription="Add QR code on certificate template. QR codes help in verification of the certificate."
        />
        <SideTool
          icon="delete"
          toolName="Delete"
          toolDescription="Delete selected items"
        />
        <SideTool
          icon="undo"
          toolName="Undo"
          toolDescription="Undo last operation"
        />
        <SideTool
          icon="redo"
          toolName="Redo"
          toolDescription="Redo last operation"
        />
        <SideTool icon="save" toolName="Save" toolDescription="Save Template" />
      </div>
    </div>
  );
};

export default SideToolBar;
