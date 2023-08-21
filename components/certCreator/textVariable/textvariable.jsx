import Draggable from "react-draggable";
import style from "./textVariable.module.css";
import { HexColorPicker } from "react-colorful";
import useTextVariable from "./useTextVariable";
import FontSelector from "@/components/subcomponents/font/fontSelector";

const Textvariable = ({ data, index, setVariables, setSelectedVariable }) => {
  const handleId = `text-handle-${index}`;

  const fontFamily = data.is_bold
    ? data.is_italic
      ? `${data.font}-bolditalic`
      : `${data.font}-bold`
    : data.is_italic
    ? `${data.font}-italic`
    : `${data.font}-normal`;

  const textScript = useTextVariable(
    data,
    index,
    setVariables,
    setSelectedVariable
  );
  const {
    isFocused,
    textWidth,
    isColorPickerFocused,
    setIsColorPickerFocused,
    parentRef,
    childRef,
    handleFocus,
    changeValue,
    changePos,
    changeColor,
    handleColorPickerFocus,
    handleColorPickerBlur,
    toggleBold,
    toggleItalic,
    changeSize,
    changeFont,
  } = textScript;

  return (
    <Draggable
      bounds="#canvas"
      handle={`#${handleId}`}
      onDrag={changePos}
      position={{ x: data.x_pos, y: data.y_pos }}
    >
      <div
        className={style.variabletext}
        onClick={() => setSelectedVariable({ type: "text", index: index })}
      >
        <input
          style={{
            fontFamily: fontFamily,
            fontSize: data.font_size + "px",
            color: `#${data.color}`,
            width: textWidth,
          }}
          value={data.value}
          type="text"
          onChange={(e) => changeValue(e.target.value)}
          onFocus={handleFocus}
          ref={parentRef}
          id={handleId}
        />
        {isFocused && (
          <TextOptions
            data={data}
            index={index}
            setVariables={setVariables}
            textScript={textScript}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Textvariable;

const TextOptions = ({ data, index, setVariables, textScript }) => {
  const {
    isFocused,
    setIsFocused,
    textWidth,
    setTextWidth,
    isColorPickerFocused,
    setIsColorPickerFocused,
    parentRef,
    childRef,
    handleFocus,
    changeValue,
    changePos,
    changeColor,
    handleColorPickerFocus,
    handleColorPickerBlur,
    toggleBold,
    toggleItalic,
    changeSize,
    changeFont,
  } = textScript;
  return (
    <div className={style.textOptions} ref={childRef}>
      {/* Bolden Text................................................ */}
      <div
        className={style.option}
        style={{
          fontWeight: "bold",
          background: data.is_bold ? "var(--primary-60)" : "none",
        }}
        onClick={toggleBold}
      >
        B
      </div>

      {/* Italicize text.......................................... */}
      <div
        className={style.option}
        style={{
          fontStyle: "italic",
          background: data.is_italic ? "var(--primary-60)" : "none",
        }}
        onClick={toggleItalic}
      >
        I
      </div>

      {/* Change font size..................................... */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--padding-light)",
        }}
      >
        Size:
        <input
          type="number"
          value={data.font_size}
          onChange={(e) => changeSize(e.target.value)}
          min={0}
          max={50}
        />
        px
      </div>

      {/* Change font ........................................................... */}
      <div style={{ display: "flex", alignItems: "center" }}>
        Font:
        <FontSelector value={data.font} onChange={changeFont} />
      </div>

      {/* Change color ................................................................. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--padding-light)",
          position: "relative",
        }}
      >
        Color:
        <div onFocus={handleColorPickerFocus} onBlur={handleColorPickerBlur}>
          <input
            type="text"
            value={`#${data.color}`}
            onChange={(e) => {}}
            style={{
              color: "var(--text-primary)",
              background: `#${data.color}`,
              width: "70px",
            }}
          />
          {isColorPickerFocused && (
            <HexColorPicker
              value={data.color}
              onChange={(e) => changeColor(e.slice(1))}
              style={{ position: "absolute", top: "40px", left: "0px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
