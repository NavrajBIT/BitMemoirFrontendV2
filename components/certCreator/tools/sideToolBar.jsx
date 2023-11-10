import SideTool from "./sideTool";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import t from "../translation";

const SideToolBar = ({ creator, dynamic, ln }) => {
  return (
    <div>
      <div className={style.sideToolBar}>
        {creator.templateBackground && (
          <BackgroundColor creator={creator} ln={ln} />
        )}
        <SideTool
          icon="text"
          toolName={t["Add Text"][ln]}
          toolDescription={t["Addtextdescription"][ln]}
          onClick={creator.addText}
        />

        <SideTool
          icon="add_image"
          toolName={t["Add Logo"][ln]}
          toolDescription={t["Addtextdescription"][ln]}
          onClick={creator.addLogo}
        />
        <SideTool
          icon="variable"
          toolName={t["Variable"][ln]}
          toolDescription={t["VariableDesc"][ln]}
          onClick={() => creator.setIsSelectingVariable(true)}
        />
        <SideTool
          icon="qr"
          toolName={t["QR Code"][ln]}
          toolDescription={t["QRdesc"][ln]}
          onClick={creator.addQrcode}
        />
        <SideTool
          icon="delete"
          toolName={t["Delete"][ln]}
          toolDescription={t["DeleteDesc"][ln]}
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
          toolName={t["Save"][ln]}
          toolDescription={t["SaveDesc"][ln]}
          onClick={creator.save}
        />
        {!dynamic && (
          <SideTool
            icon="saveas"
            toolName={t["Save As"][ln]}
            toolDescription={t["SaveAsDesc"][ln]}
            onClick={() => creator.setsaveaspopup(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SideToolBar;

const BackgroundColor = ({ creator, ln }) => {
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
        toolName={t["Background Color"][ln]}
        toolDescription={t["BGColorDesc"][ln]}
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
