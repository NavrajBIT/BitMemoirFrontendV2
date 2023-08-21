import BottomTool from "./bottomTool";
import style from "../certCreator.module.css";

const BottomToolBar = ({ creator }) => {
  return (
    <div className={style.bottomToolBarContainer}>
      <div className={style.bottomToolBar}>
        <BottomTool
          icon="text"
          toolName="Add Text"
          toolDescription="Add permanent text on the certificate template"
          onClick={creator.addText}
        />

        <BottomTool
          icon="add_image"
          toolName="Add Logo"
          toolDescription="Add logo on the certificate template"
          onClick={creator.addLogo}
        />
        <BottomTool
          icon="variable"
          toolName="Variable"
          toolDescription="Add variable on the certificate template. Variable values can vary on different certificate issuances. e.g. Student Name"
          onClick={() => creator.setIsSelectingVariable(true)}
        />
        <BottomTool
          icon="qr"
          toolName="QR Code"
          toolDescription="Add QR code on certificate template. QR codes help in verification of the certificate."
          onClick={creator.addQrcode}
        />
        <BottomTool
          icon="delete"
          toolName="Delete"
          toolDescription="Delete selected items"
          onClick={creator.deletevariable}
        />
        <BottomTool
          icon="save"
          toolName="Save"
          toolDescription="Save Template"
          onClick={creator.save}
        />
        <BottomTool
          icon="saveas"
          toolName="Save As"
          toolDescription="Duplicate template to another file"
          onClick={creator.saveas}
        />
      </div>
    </div>
  );
};

export default BottomToolBar;
