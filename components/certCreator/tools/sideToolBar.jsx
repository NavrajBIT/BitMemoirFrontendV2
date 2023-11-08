import SideTool from "./sideTool";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const SideToolBar = ({ creator, dynamic }) => {
  return (
    <div>
      <div className={style.sideToolBar}>
        {creator.templateBackground && <BackgroundColor creator={creator} />}
        <SideTool
          icon="text"
          toolName="Add Text"
          toolDescription="Add permanent text on the certificate template"
          onClick={creator.addText}
        />

        <SideTool
          icon="add_image"
          toolName="Add Logo"
          toolDescription="Add logo on the certificate template"
          onClick={creator.addLogo}
        />
        <SideTool
          icon="variable"
          toolName="Variable"
          toolDescription="Add variable on the certificate template. Variable values can vary on different certificate issuances. e.g. Student Name"
          onClick={() => creator.setIsSelectingVariable(true)}
        />
        <SideTool
          icon="qr"
          toolName="QR Code"
          toolDescription="Add QR code on certificate template. QR codes help in verification of the certificate."
          onClick={creator.addQrcode}
        />
        <SideTool
          icon="delete"
          toolName="Delete"
          toolDescription="Delete selected items"
          onClick={creator.deletevariable}
        />
        {/* <SideTool
          icon="undo"
          toolName="Undo"
          toolDescription="Undo last operation"
        />
        <SideTool
          icon="redo"
          toolName="Redo"
          toolDescription="Redo last operation"
        /> */}
        <SideTool
          icon="save"
          toolName="Save"
          toolDescription="Save Template"
          onClick={creator.save}
        />
        {!dynamic && (
          <SideTool
            icon="saveas"
            toolName="Save As"
            toolDescription="Duplicate template to another file"
            onClick={() => creator.setsaveaspopup(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SideToolBar;

const BackgroundColor = ({ creator }) => {
  const [isColorpicker, setIsColorPicker] = useState(false);
  const [isColorPickerFocused, setIsColorPickerFocused] = useState(false);
  const changeColor = (color) => {
    creator.setTemplateBackground(color);
  };

  const openColorPicker = () => {
    setIsColorPicker((prev) => !prev);
    setTimeout(() => {
      setIsColorPicker(false);
    }, 1000);
  };

  return (
    <div
      style={{ position: "relative" }}
      onFocus={() => setIsColorPickerFocused(true)}
      onBlur={() => setIsColorPickerFocused(false)}
    >
      <SideTool
        icon="color"
        toolName="Background Color"
        toolDescription="Change Template Background Color"
        onClick={openColorPicker}
      />
      <div
        onFocus={() => setIsColorPickerFocused(true)}
        onBlur={() => setIsColorPickerFocused(false)}
        style={{
          display: isColorpicker || isColorPickerFocused ? "flex" : "none",
        }}
        className={style.colorPickerContainer}
      >
        {isColorPickerFocused && (
          <HexColorPicker
            value={creator.templateBackground}
            onChange={(e) => changeColor(e.slice(1))}
            style={{ position: "absolute", top: "0px", left: "0px" }}
          />
        )}
      </div>
    </div>
  );
};
