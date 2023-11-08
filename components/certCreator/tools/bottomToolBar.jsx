import BottomTool from "./bottomTool";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import t from "../translation";

const BottomToolBar = ({ creator, dynamic, ln }) => {
  return (
    <div className={style.bottomToolBarContainer}>
      <div className={style.bottomToolBar}>
        {creator.templateBackground && <BackgroundColor creator={creator} />}
        <BottomTool
          icon="text"
          toolName={t["Add Text"][ln]}
          toolDescription={t["Addtextdescription"][ln]}
          onClick={creator.addText}
        />

        <BottomTool
          icon="add_image"
          toolName={t["Add Logo"][ln]}
          toolDescription={t["Addtextdescription"][ln]}
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
        {!dynamic && (
          <BottomTool
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
