import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import style from "./variable.module.css";
import { HexColorPicker } from "react-colorful";
import useVariable from "./usevariable";

const Variable = ({
  data,
  index,
  setVariables,
  setSelectedVariable,
  selectedVariable,
}) => {
  const handleId = `variable-handle-${index}`;

  const textScript = useVariable(
    data,
    index,
    setVariables,
    setSelectedVariable,
    selectedVariable
  );
  const {
    isSelected,
    isColorPickerFocused,
    setIsColorPickerFocused,
    changePos,
    changeColor,
    handleColorPickerFocus,
    handleColorPickerBlur,
    toggleBold,
    toggleItalic,
    changeSize,
    changeFont,
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
  } = textScript;

  return (
    <Draggable
      bounds="#canvas"
      handle={`#${handleId}`}
      onDrag={changePos}
      position={{ x: data.x_pos, y: data.y_pos }}
      disabled={isColorPickerFocused || isResizing}
    >
      <div
        className={style.variablecontainer}
        onClick={() => setSelectedVariable({ type: "variable", index: index })}
        onMouseEnter={() => setIsResizeVisible(true)}
        onMouseLeave={() => setIsResizeVisible(false)}
        style={{
          fontFamily: data.font,
          fontSize: data.font_size + "px",
          color: `#${data.color}`,
          fontStyle: data.is_italic ? "italic" : "normal",
          fontWeight: data.is_bold ? "bold" : "normal",
          boxShadow: isSelected ? "0 0 10px var(--primary-110)" : "none",
        }}
        id={handleId}
      >
        <Resizable
          handleComponent={
            isResizeVisible && {
              bottomRight: <CornerHandle setIsResizing={setIsResizing} />,
              right: <VerticalHandle setIsResizing={setIsResizing} />,
              bottom: <HorizontalHandle setIsResizing={setIsResizing} />,
            }
          }
          size={{ width: data.width, height: data.height }}
          onResizeStop={changeSize}
        />
        <div className={style.innerText}>{data.name}</div>

        {isSelected && (
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

export default Variable;

const TextOptions = ({ data, index, setVariables, textScript }) => {
  const {
    isSelected,
    isColorPickerFocused,
    setIsColorPickerFocused,
    changePos,
    changeColor,
    handleColorPickerFocus,
    handleColorPickerBlur,
    toggleBold,
    toggleItalic,
    changeSize,
    changeFont,
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
  } = textScript;
  return (
    <div className={style.textOptions}>
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
        <select
          value={data.font}
          onChange={(e) => changeFont(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more font options as needed */}
        </select>
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

const CornerHandle = ({ setIsResizing }) => (
  <div
    className={style.cornerHandle}
    onMouseEnter={() => setIsResizing(true)}
    onMouseLeave={() => setIsResizing(false)}
  />
);
const HorizontalHandle = ({ setIsResizing }) => (
  <div
    className={style.horizontalHandle}
    onMouseEnter={() => setIsResizing(true)}
    onMouseLeave={() => setIsResizing(false)}
  />
);
const VerticalHandle = ({ setIsResizing }) => (
  <div
    className={style.verricalHandle}
    onMouseEnter={() => setIsResizing(true)}
    onMouseLeave={() => setIsResizing(false)}
  />
);
