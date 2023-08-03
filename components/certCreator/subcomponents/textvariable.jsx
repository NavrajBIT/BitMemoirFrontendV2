import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import style from "../certCreator.module.css";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const Textvariable = ({ data, index, setVariables }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <Draggable bounds="parent">
      <div
        className={style.variabletext}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <textarea
          style={{
            fontFamily: data.font,
            fontSize: data.font_size + "px",
            color: `#${data.color}`,
            fontStyle: data.is_italic ? "italic" : "normal",
            fontWeight: data.is_bold ? "bold" : "normal",
          }}
          value={data.value}
          onChange={(e) =>
            setVariables((prevState) => ({
              ...prevState,
              text: [
                {
                  ...prevState.text[index],
                  value: e.target.value,
                },
              ],
            }))
          }
          rows="1"
          cols={data.value.length}
        />
        {isFocused && (
          <TextOptions
            data={data}
            index={index}
            setVariables={setVariables}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Textvariable;

const TextOptions = ({ data, index, setVariables }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={style.textOptions}>
      {/* Bolden Text................................................ */}
      <div
        className={style.option}
        style={{
          fontWeight: "bold",
          background: data.is_bold ? "var(--primary-60)" : "none",
        }}
        onClick={() =>
          setVariables((prevState) => ({
            ...prevState,
            text: [
              {
                ...prevState.text[index],
                is_bold: !prevState.text[index].is_bold,
              },
            ],
          }))
        }
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
        onClick={() =>
          setVariables((prevState) => ({
            ...prevState,
            text: [
              {
                ...prevState.text[index],
                is_italic: !prevState.text[index].is_italic,
              },
            ],
          }))
        }
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
          onChange={(e) =>
            setVariables((prevState) => ({
              ...prevState,
              text: [
                {
                  ...prevState.text[index],
                  font_size: e.target.value,
                },
              ],
            }))
          }
        />
        px
      </div>

      {/* Change font ........................................................... */}
      <div style={{ display: "flex", alignItems: "center" }}>
        Font:
        <select
          value={data.font}
          onChange={(e) =>
            setVariables((prevState) => ({
              ...prevState,
              text: [
                {
                  ...prevState.text[index],
                  font: e.target.value,
                },
              ],
            }))
          }
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
        <div onFocus={handleFocus} onBlur={handleBlur}>
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
          {isFocused && (
            <HexColorPicker
              value={data.color}
              onChange={(e) =>
                setVariables((prevState) => ({
                  ...prevState,
                  text: [
                    {
                      ...prevState.text[index],
                      color: e.slice(1),
                    },
                  ],
                }))
              }
              style={{ position: "absolute", top: "40px", left: "0px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
