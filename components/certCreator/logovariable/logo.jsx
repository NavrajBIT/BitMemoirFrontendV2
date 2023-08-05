import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import style from "./logo.module.css";
import uselogo from "./uselogo";

const Logo = ({
  data,
  index,
  setVariables,
  selectedVariable,
  setSelectedVariable,
}) => {
  const handleId = `logo-handle-${index}`;

  const {
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
    logoRef,
    changePos,
    changeSize,
    isSelected,
  } = uselogo(data, index, setVariables, selectedVariable);

  return (
    <Draggable
      bounds="#canvas"
      disabled={isResizing}
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
          backgroundImage: `url(${data.logo_image})`,
          backgroundSize: `${data.width}px ${data.height}px`,
        }}
        ref={logoRef}
        onClick={() => setSelectedVariable({ type: "logo", index: index })}
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
      </div>
    </Draggable>
  );
};

export default Logo;

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
