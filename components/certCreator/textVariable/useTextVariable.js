import { useState, useRef, useEffect } from "react";

const useTextVariable = (data, index, setVariables) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textWidth, setTextWidth] = useState("");
  const [isColorPickerFocused, setIsColorPickerFocused] = useState(false);
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    setTextWidth(
      getTextWidth(
        data.value,
        data.font,
        data.font_size,
        data.is_bold,
        data.is_italic
      )
    );
  }, [data.value, data.font, data.font_size, data.is_bold, data.is_italic]);

  const handleDocumentClick = (event) => {
    if (
      parentRef.current &&
      !parentRef.current.contains(event.target) &&
      childRef.current &&
      !childRef.current.contains(event.target)
    ) {
      handleBlur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  function getTextWidth(text, font, fontSize, isBold, isItalic) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    let fontStyle = "";
    if (isBold) {
      fontStyle += "bold ";
    }
    if (isItalic) {
      fontStyle += "italic ";
    }
    context.font = `${fontStyle}${fontSize}px ${font}`;

    const textMetrics = context.measureText(text);
    const width = Math.round(textMetrics.width) + 20;
    canvas.remove();
    return `${width}px`;
  }

  const changeValue = (newvalue) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        value: newvalue,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };

  const changePos = (e, data) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        x_pos: data.x,
        y_pos: data.y,
      };
      return {
        ...prevState,
        text: newText,
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
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        is_bold: !prevState.text[index].is_bold,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };
  const toggleItalic = (newvalue) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        is_italic: !prevState.text[index].is_italic,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };
  const changeSize = (newvalue) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        font_size: newvalue,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };
  const changeFont = (newvalue) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        font: newvalue,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };
  const changeColor = (newvalue) => {
    setVariables((prevState) => {
      const newText = [...prevState.text];
      newText[index] = {
        ...newText[index],
        color: newvalue,
      };
      return {
        ...prevState,
        text: newText,
      };
    });
  };

  return {
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
  };
};

export default useTextVariable;
