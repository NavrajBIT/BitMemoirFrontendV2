import { useState, useRef, useEffect } from "react";

const useVariable = (
  data,
  index,
  setVariables,
  setSelectedVariable,
  selectedVariable
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isColorPickerFocused, setIsColorPickerFocused] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isResizeVisible, setIsResizeVisible] = useState(false);

  const changePos = (e, data) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        x_pos: data.x,
        y_pos: data.y,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };

  const handleColorPickerFocus = () => {
    setIsColorPickerFocused(true);
  };

  const handleColorPickerBlur = () => {
    setIsColorPickerFocused(false);
  };

  const toggleBold = (newvalue) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        is_bold: !prevState.variable[index].is_bold,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };
  const toggleItalic = (newvalue) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        is_italic: !prevState.variable[index].is_italic,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };
  const changeSize = (e, direction, ref, d) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        width: data.width + d.width,
        height: data.height + d.height,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };
  const changeFontSize = (newValue) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        font_size: newValue,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };

  const changeFont = (newvalue) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        font: newvalue,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };
  const changeColor = (newvalue) => {
    setVariables((prevState) => {
      const newVar = [...prevState.variable];
      newVar[index] = {
        ...newVar[index],
        color: newvalue,
      };
      return {
        ...prevState,
        variable: newVar,
      };
    });
  };

  const isSelected =
    selectedVariable !== null &&
    selectedVariable.type === "variable" &&
    selectedVariable.index === index;

  return {
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
    changeFontSize,
    changeFont,
    isResizing,
    setIsResizing,
    isResizeVisible,
    setIsResizeVisible,
  };
};

export default useVariable;
