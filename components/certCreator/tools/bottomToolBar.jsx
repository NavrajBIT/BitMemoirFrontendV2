import BottomTool from "./bottomTool";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const BottomToolBar = ({ creator }) => {
  return (
    <div className={style.bottomToolBarContainer}>
      <div className={style.bottomToolBar}>
        {creator.templateBackground && <BackgroundColor creator={creator} />}
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
          onClick={() => creator.setsaveaspopup(true)}
        />
      </div>
    </div>
  );
};

export default BottomToolBar;

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
      <BottomTool
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
            style={{ position: "absolute", bottom: "50px", left: "0px" }}
          />
        )}
      </div>
    </div>
  );
};
