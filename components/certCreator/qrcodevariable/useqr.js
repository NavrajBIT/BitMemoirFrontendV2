import { useState, useRef, useEffect } from "react";

const useqr = (data, index, setVariables, selectedVariable) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isResizeVisible, setIsResizeVisible] = useState(false);
  const [isColorPickerFocused, setIsColorPickerFocused] = useState(false);
  const [isBGColorPickerFocused, setIsBGColorPickerFocused] = useState(false);
  const logoRef = useRef(null);

  const changePos = (e, data) => {
    setVariables((prevState) => {
      const newQR = [...prevState.qrcode];
      newQR[index] = {
        ...newQR[index],
        x_pos: data.x,
        y_pos: data.y,
      };
      return {
        ...prevState,
        qrcode: newQR,
      };
    });
  };
  const changeSize = (e, direction, ref, d) => {
    let newWidth = data.width + d.width;
    let newHeight = data.height + d.height;

    if (newWidth < 100) {
      newWidth = 100;
    }
    if (newHeight < 100) {
      newHeight = 100;
    }

    setVariables((prevState) => {
      const newQR = [...prevState.qrcode];
      newQR[index] = {
        ...newQR[index],
        width: newWidth,
        height: newHeight,
      };
      return {
        ...prevState,
        qrcode: newQR,
      };
    });
  };

  const changeColor = (newvalue) => {
    setVariables((prevState) => {
      const newQR = [...prevState.qrcode];
      newQR[index] = {
        ...newQR[index],
        color: newvalue,
      };
      return {
        ...prevState,
        qrcode: newQR,
      };
    });
  };
  const changeBGColor = (newvalue) => {
    setVariables((prevState) => {
      const newQR = [...prevState.qrcode];
      newQR[index] = {
        ...newQR[index],
        background_color: newvalue,
      };
      return {
        ...prevState,
        qrcode: newQR,
      };
    });
  };

  const isSelected =
    selectedVariable !== null &&
    selectedVariable.type === "qrcode" &&
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
    isColorPickerFocused,
    setIsColorPickerFocused,
    isBGColorPickerFocused,
    setIsBGColorPickerFocused,
    changeBGColor,
    changeColor,
  };
};

export default useqr;
