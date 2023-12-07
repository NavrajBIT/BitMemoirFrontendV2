import BottomTool from "./bottomTool";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import t from "../translation";

const BottomToolBar = ({ creator, dynamic, ln }) => {
  return (
    <div className={style.bottomToolBarContainer}>
      <div className={style.bottomToolBar}>
        {creator.templateBackground && (
          <BackgroundColor creator={creator} ln={ln} />
        )}
        <BottomTool
          icon="text"
          toolName={t["Add Text"][ln]}
          toolDescription={t["Addtextdescription"][ln]}
          onClick={creator.addText}
        />

        <BottomTool
          icon="add_image"
          toolName={t["Add Logo"][ln]}
          toolDescription={t["AddImageDesc"][ln]}
          onClick={creator.addLogo}
        />
        <BottomTool
          icon="variable"
          toolName={t["Variable"][ln]}
          toolDescription={t["VariableDesc"][ln]}
          onClick={() => creator.setIsSelectingVariable(true)}
        />
        <BottomTool
          icon="qr"
          toolName={t["QR Code"][ln]}
          toolDescription={t["QRdesc"][ln]}
          onClick={creator.addQrcode}
        />
        <BottomTool
          icon="delete"
          toolName={t["Delete"][ln]}
          toolDescription={t["DeleteDesc"][ln]}
          onClick={creator.deletevariable}
        />

        <BottomTool
          icon="save"
          toolName={t["Save"][ln]}
          toolDescription={t["SaveDesc"][ln]}
          onClick={creator.save}
        />
        {!dynamic && (
          <BottomTool
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

export default BottomToolBar;

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
      <BottomTool
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
            style={{ position: "absolute", bottom: "50px", left: "0px" }}
          />
        )}
      </div>
    </div>
  );
};
