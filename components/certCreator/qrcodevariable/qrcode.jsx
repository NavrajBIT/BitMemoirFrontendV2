import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import style from "./qr.module.css";
import useqr from "./useqr";
import QRCode from "react-qr-code";
import { HexColorPicker } from "react-colorful";

const Qrcode = ({
  data,
  index,
  setVariables,
  selectedVariable,
  setSelectedVariable,
}) => {
  const handleId = `qr-handle-${index}`;

  const {
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
    logoRef,
    changePos,
    changeSize,
    isSelected,
    isColorPickerFocused,
    setIsColorPickerFocused,
    changeColor,
  } = useqr(data, index, setVariables, selectedVariable);

  return (
    <Draggable
      bounds="#canvas"
      disabled={isResizing || isColorPickerFocused}
      handle={`#${handleId}`}
      onDrag={changePos}
      position={{ x: data.x_pos, y: data.y_pos }}
    >
      <div
        className={style.logoContainer}
        onMouseEnter={() => setIsResizeVisible(true)}
        onMouseLeave={() => setIsResizeVisible(false)}
        id={handleId}
        style={{
          boxShadow: isSelected ? "0 0 10px var(--primary-50)" : "none",
        }}
        ref={logoRef}
        onClick={() => setSelectedVariable({ type: "qrcode", index: index })}
      >
        <Resizable
          handleComponent={
            isResizeVisible && {
              bottomRight: <CornerHandle setIsResizing={setIsResizing} />,
            }
          }
          size={{ width: data.width, height: data.height }}
          lockAspectRatio={1}
          minWidth={"100px"}
          minHeight={"100px"}
          onResizeStop={changeSize}
        />

        <QRCode
          size={256}
          style={{
            height: `${data.width}px`,
            width: `${data.height}px`,
            position: "absolute",
            top: "0px",
          }}
          bgColor="transparent"
          fgColor={`#${data.color}`}
          value={"https://bitmemoir.com/sampleqr"}
          viewBox={`0 0 256 256`}
        />

        {isSelected && (
          <QROptions
            data={data}
            isColorPickerFocused={isColorPickerFocused}
            setIsColorPickerFocused={setIsColorPickerFocused}
            changeColor={changeColor}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Qrcode;

const QROptions = ({
  data,
  isColorPickerFocused,
  setIsColorPickerFocused,
  changeColor,
}) => {
  return (
    <div className={style.textOptions}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--padding-light)",
          position: "relative",
        }}
      >
        Color:
        <div
          onFocus={() => setIsColorPickerFocused(true)}
          onBlur={() => setIsColorPickerFocused(false)}
        >
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
