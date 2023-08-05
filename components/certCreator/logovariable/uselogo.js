import { useState, useRef, useEffect } from "react";

const uselogo = (data, index, setVariables, selectedVariable) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isResizeVisible, setIsResizeVisible] = useState(false);
  const logoRef = useRef(null);

  const changePos = (e, data) => {
    setVariables((prevState) => {
      const newLogo = [...prevState.logo];
      newLogo[index] = {
        ...newLogo[index],
        x_pos: data.x,
        y_pos: data.y,
      };
      return {
        ...prevState,
        logo: newLogo,
      };
    });
  };
  const changeSize = (e, direction, ref, d) => {
    setVariables((prevState) => {
      const newLogo = [...prevState.logo];
      newLogo[index] = {
        ...newLogo[index],
        width: data.width + d.width,
        height: data.height + d.height,
      };
      return {
        ...prevState,
        logo: newLogo,
      };
    });
  };
  const isSelected =
    selectedVariable !== null &&
    selectedVariable.type === "logo" &&
    selectedVariable.index === index;
  return {
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
    logoRef,
    changePos,
    changeSize,
    isSelected,
  };
};

export default uselogo;
