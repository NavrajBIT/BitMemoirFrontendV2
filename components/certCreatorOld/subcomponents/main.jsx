"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import QRCode from "react-qr-code";
import ResizeHandle from "./ResizeHandle";

const Main = ({ variable, setVariable, tool, setTool }) => {
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textItems, setTextItems] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [editing, setEditing] = useState(0);

  const [qrCodeColor, setQRCodeColor] = useState("#000000");
  const [qrCodeSize, setQRCodeSize] = useState(70);
  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    setText(variable);
    setIsClicked(false);
    setSelectedItemId(0);
  }, [variable]);

  console.log(textItems);
  console.log(tool);
  console.log(qrCodeColor);

  const imageRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handleFontColorChange = (color) => {
    setFontColor(color.hex);
  };

  const handleBoldChange = (event) => {
    setIsBold(event.target.checked);
  };

  const handleItalicChange = (event) => {
    setIsItalic(event.target.checked);
  };

  const handleClick = (id) => {
    setSelectedItemId(id);
    setIsClicked(!isClicked);
  };

  const buttonStyle = {
    position: "absolute",
    top: "-1.3rem",
    right: "-0.3rem",
    cursor: "pointer",
    fontSize: "1rem",
    color: "black",
  };

  const handleTextDrag = (id, position) => {
    // Update the position of the dragged text
    setTextItems((prevTextItems) => ({
      ...prevTextItems,
      [id]: {
        ...prevTextItems[id],
        x: position.x,
        y: position.y,
      },
    }));
  };

  const pickerStyles = {
    picker: {
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    head: {
      display: "none",
    },
  };

  const handleAddText = () => {
    const id = Date.now().toString();
    setTextItems((prevTextItems) => ({
      ...prevTextItems,
      [id]: {
        text,
        fontFamily,
        fontSize,
        fontColor,
        x: 0, // Default x position
        y: 0, // Default y position
        isBold,
        isItalic,
        flag: false,
        height: "30px",
        width: "100px",
      },
    }));
    setText("");
  };

  const OnClickRemoveButton = () => {
    const updatedTextItems = { ...textItems };
    delete updatedTextItems[selectedItemId];
    setTextItems(updatedTextItems);
    setSelectedItemId(0);
  };

  const handleEditButton = () => {
    setEditing(1);
    setText(textItems[selectedItemId].text);
  };

  const handleEditSave = () => {
    const { x, y } = textItems[selectedItemId];
    const updatedTextItems = {
      ...textItems,
      [selectedItemId]: {
        text,
        fontFamily,
        fontSize,
        fontColor,
        x,
        y,
        isBold,
        isItalic,
        flag: false,
      },
    };
    setTextItems(updatedTextItems);
    setText("");
    setEditing(0);
  };

  // const handleResizeStart = (e, direction) => {
  //   if (
  //     // direction !== "bottomLeft" &&
  //     direction !== "topLeft" &&
  //     direction !== "top" &&
  //     direction !== "left"
  //   ) {
  //     e.stopPropagation();
  //   }
  // };

  const style = {
    cursor: "move",
    // background: "skyblue",
    // border: "1px solid black",
    textAlign: "center",
    alignItems: "center",
  };

  const handleTextMouseDown = (id) => {
    setTextItems((prevTextItems) => ({
      ...prevTextItems,
      [id]: {
        ...prevTextItems[id],
        flag: true,
      },
    }));
  };

  const handleTextMouseUp = () => {
    setTextItems((prevTextItems) => {
      const updatedTextItems = { ...prevTextItems };
      Object.keys(updatedTextItems).forEach((itemId) => {
        updatedTextItems[itemId] = { ...updatedTextItems[itemId], flag: false };
      });
      return updatedTextItems;
    });
  };

  const handleResize = (id, width, height) => {
    console.log(id);

    if (id !== null) {
      setTextItems((prevTextItems) => ({
        ...prevTextItems,
        [id]: {
          ...prevTextItems[id],
          width,
          height,
        },
      }));
    }
  };

  const handleResizeStart = (e, direction, ref, delta, position) => {
    const boxId = ref.parentElement.getAttribute("data-boxid");
    handleResize(boxId, ref.clientWidth, ref.clientHeight);

    if (
      direction !== "topLeft" &&
      direction !== "top" &&
      direction !== "left"
    ) {
      e.stopPropagation();
    }
  };

  const handleQRCodeColorChange = (color) => {
    console.log(color);
    setQRCodeColor(color);
  };

  // Function to handle QR code resizing
  const handleQRCodeResize = (width, height) => {
    setQRCodeSize({ width, height });
  };

  return (
    <div
      style={{
        width: "80%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        marginTop: "8rem",
      }}
    >
      {!selectedImage ? (
        <div
          style={{
            width: "70%",
            height: "80vh",
            backgroundColor: "#002D36",
            border: "1px solid #00D4FF",
            borderStyle: "dashed",
            borderRadius: "10px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => document.getElementById("image-selector").click()}
        >
          <div>
            <p
              style={{
                color: "#00D4FF",
                fontSize: "1.5rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Upload Your Image
            </p>
          </div>
          <Image
            src={""}
            alt="ImageIcon"
            style={{
              width: "10rem",
              height: "auto",
            }}
          />
          <div>
            <input
              id="image-selector"
              type="file"
              onChange={(e) => handleImageChange(e)}
              style={{
                display: "none",
              }}
            />
          </div>
        </div>
      ) : (
        // <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />

        <>
          <div style={{ position: "relative", width: "100%", height: "auto" }}>
            <img
              ref={imageRef}
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            {tool === "Add Text" && (
              <>
                <Draggable bounds="parent">
                  <div
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: "20%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: fontFamily,
                      fontSize: fontSize + "px",
                      color: fontColor,
                      fontStyle: isItalic ? "italic" : "normal",
                      fontWeight: isBold ? "bold" : "normal",
                      padding: "8px",
                      background: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      zIndex: 1, // Ensure the editing tools are above the canvas
                      border: "1px solid grey",
                      minWidth: "100px",
                      minHeight: "30px",
                    }}
                    onClick={() => {
                      setSelectedItemId(0);
                      setIsClicked(false);
                    }}
                  >
                    <span style={buttonStyle}>Preview</span>

                    {text}
                  </div>
                </Draggable>{" "}
              </>
            )}

            <Draggable bounds="parent">
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: "8px",
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  zIndex: 1, // Ensure the editing tools are above the canvas
                  border: "1px solid grey",
                }}
              >
                <QRCode
                  value="https://bitmemoir.com"
                  bgColor="transparent"
                  fgColor={qrCodeColor}
                  size={qrCodeSize}
                />
              </div>
            </Draggable>

            {Object.entries(textItems).map(([id, textItem]) => {
              const { text, flag, width, height } = textItems[id];
              const style = {
                textAlign: "center",
                width: `${width}px`,
                height: `${height}px`,
                cursor: "grab",
              };
              return (
                <Draggable
                  key={id}
                  bounds="parent"
                  position={{ x: textItem.x, y: textItem.y }}
                  onDrag={(e, data) =>
                    handleTextDrag(id, { x: data.x, y: data.y })
                  }
                >
                  <div
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: textItem.fontFamily,
                      fontSize: textItem.fontSize + "px",
                      color: textItem.fontColor,
                      fontStyle: textItem.isItalic ? "italic" : "normal",
                      fontWeight: textItem.isBold ? "bold" : "normal",
                      position: "absolute",
                      zIndex: 1,
                      // border: isClicked ? '1px solid gray' : 'none',
                      // borderRadius: isClicked ? '5px' : '0',
                      background:
                        selectedItemId === id ? "rgba(255, 255, 255, 0.8)" : "",
                      boxShadow:
                        selectedItemId === id
                          ? "0 2px 4px rgba(0, 0, 0, 0.2)"
                          : "",
                      border: selectedItemId === id ? "1px solid gray" : "none",
                      borderRadius: selectedItemId === id ? "5px" : "0",
                    }}
                    className="text-box"
                    onClick={() => handleClick(id)}
                    // onMouseDownCapture={() => {
                    //   setFlag(true);
                    // }}
                    // onMouseUpCapture={() => {
                    //   setFlag(false);
                    // }}
                    onMouseDownCapture={() => handleTextMouseDown(id)}
                    onMouseUpCapture={handleTextMouseUp}
                  >
                    {isClicked && (
                      <span
                        style={buttonStyle}
                        onClick={(e) => {
                          // e.stopPropagation();
                          // setIsClicked(false);
                          // setSelectedItemId(id)
                          OnClickRemoveButton();
                        }}
                      >
                        X
                      </span>
                    )}

                    <Resizable
                      style={style}
                      defaultSize={{
                        width: 150,
                        height: 40,
                      }}
                      // onResizeStart={handleResizeStart}
                      onResizeStart={handleResizeStart}
                      onResize={(e, direction, ref, delta, position) =>
                        handleResize(id, ref.clientWidth, ref.clientHeight)
                      }
                      minWidth={100}
                      minHeight={20}
                      maxHeight={500}
                      maxWidth={500}
                      handleStyles={{
                        top: textItem.flag
                          ? {
                              marginTop: -3,
                              marginLeft: -5,
                              top: 0,
                              left: "50%",
                              cursor: "ns-resize",
                              border: "3px solid #999",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              borderWidth: 5,
                              borderColor: "#4d4d4d",
                              width: 10,
                              height: 10,
                              boxSizing: "border-box",
                              zIndex: 1,
                            }
                          : "",
                        left: textItem.flag
                          ? {
                              marginTop: -5,
                              marginLeft: -3,
                              top: "50%",
                              left: 0,
                              cursor: "ew-resize",
                              border: "3px solid #999",
                              borderTop: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              borderWidth: 5,
                              borderColor: "#4d4d4d",
                              width: 10,
                              height: 10,
                              boxSizing: "border-box",
                              zIndex: 1,
                            }
                          : "",
                        bottom: textItem.flag && {
                          marginTop: -7,
                          marginLeft: -5,
                          top: "100%",
                          left: "50%",
                          cursor: "ns-resize",
                          border: "3px solid #999",
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          borderWidth: 5,
                          borderColor: "#4d4d4d",
                          width: 10,
                          height: 10,
                          boxSizing: "border-box",
                          zIndex: 1,
                        },
                        right: textItem.flag
                          ? {
                              marginTop: -5,
                              marginLeft: -7,
                              top: "50%",
                              left: "100%",
                              cursor: "ew-resize",
                              border: "3px solid #999",
                              borderTop: "none",
                              borderLeft: "none",
                              borderBottom: "none",
                              borderWidth: 5,
                              borderColor: "#4d4d4d",
                              width: 10,
                              height: 10,
                              boxSizing: "border-box",
                              zIndex: 1,
                            }
                          : "",
                      }}
                      handleComponent={{
                        topRight: textItem.flag ? <ResizeHandle /> : "",
                        topLeft: textItem.flag ? <ResizeHandle /> : "",
                        bottomLeft: textItem.flag ? <ResizeHandle /> : "",
                        bottomRight: textItem.flag ? <ResizeHandle /> : "",
                      }}
                      resizeRatio={1}
                    >
                      <span>{textItem.text}</span>
                    </Resizable>
                  </div>
                </Draggable>
              );
            })}
          </div>

          {tool === "Add Text" && (
            <div
              style={{
                width: "300px",
                padding: "16px",
                background: "#002D36",
                marginLeft: "2rem",
              }}
            >
              {/* <div style={{ marginBottom: '16px' }}>
                  <label>Text: </label>
                  <input
                  type="text"
                  value={text}
                  onChange={handleTextChange}
                  style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                  />
                </div> */}
              <div style={{ marginBottom: "16px" }}>
                <label>Font Family: </label>
                <select
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                  {/* Add more font options as needed */}
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label>Font Size: </label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                />
              </div>
              <div style={{ marginBottom: "16px", width: "fit-content" }}>
                <label>Font Color: </label>
                <input
                  style={{ marginLeft: "1rem" }}
                  type="color"
                  color={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "16px", width: "fit-content" }}>
                <label>Font Style: </label>
                <div
                  style={{
                    marginTop: "0.5rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={isBold}
                      onChange={handleBoldChange}
                    />{" "}
                    Bold
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={isItalic}
                      onChange={handleItalicChange}
                    />{" "}
                    Italic
                  </label>
                </div>
              </div>
              <div>
                {editing !== 1 && (
                  <button
                    onClick={handleAddText}
                    style={{
                      color: "white",
                      backgroundColor: "#0094B2",
                      padding: "1rem",
                      borderRadius: "0.2rem",
                      border: "none",
                      marginTop: "3rem",
                      // marginLeft:"10rem",
                      cursor: "pointer",
                    }}
                  >
                    Add Text
                  </button>
                )}
                {/* {editing !== 1 && (selectedItemId !==0 && 
                  <button onClick={OnClickRemoveButton} style={{
                    color:"white",
                    backgroundColor:"#0094B2",
                    padding:"1rem",
                    borderRadius:"0.2rem",
                    border:"none",
                    marginTop:"3rem",
                    marginLeft:"1rem",
                    cursor:"pointer",
                   }}>
                    Remove Text
                  </button>)} */}

                {editing !== 1 && selectedItemId !== 0 && (
                  <button
                    onClick={handleEditButton}
                    style={{
                      color: "white",
                      backgroundColor: "#0094B2",
                      padding: "1rem",
                      borderRadius: "0.2rem",
                      border: "none",
                      marginTop: "3rem",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Edit Text
                  </button>
                )}
                {editing === 1 && (
                  <button
                    onClick={handleEditSave}
                    style={{
                      color: "white",
                      backgroundColor: "#0094B2",
                      padding: "1rem",
                      borderRadius: "0.2rem",
                      border: "none",
                      marginTop: "3rem",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )}
          {tool === "QR Code" && (
            <div
              style={{
                width: "300px",
                padding: "16px",
                background: "#002D36",
                marginLeft: "2rem",
              }}
            >
              <div style={{ marginBottom: "16px", width: "fit-content" }}>
                <label>QR Code Color: </label>
                <input
                  style={{ marginLeft: "1rem" }}
                  type="color"
                  value={qrCodeColor}
                  onChange={(e) => handleQRCodeColorChange(e.target.value)}
                />
              </div>

              {/* QR Code Resizing */}
              <div>
                <label>QR Code Size: </label>
                <input
                  type="number"
                  value={qrCodeSize}
                  onChange={(e) => setQRCodeSize(Number(e.target.value))}
                  style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                />
              </div>
            </div>
          )}
          {tool === "Add Logo" && (
            <div
              style={{
                width: "300px",
                padding: "16px",
                background: "#002D36",
                marginLeft: "2rem",
              }}
            >
              <div
                onClick={() => document.getElementById("logo-selector").click()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    color: "#00D4FF",
                    fontSize: "1rem",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Upload Logo
                </p>
                <Image
                  src={ImageIcon}
                  alt="ImageIcon"
                  style={{
                    width: "5rem",
                    height: "auto",
                  }}
                />
                <div>
                  <input
                    id="logo-selector"
                    type="file"
                    onChange={(e) => setLogoImage(e.target.files[0])}
                    style={{
                      display: "none",
                    }}
                  />
                </div>
                {logoImage && (
                  <div
                    style={{
                      border: "1px solid grey",
                      boxShadow: "0 2px 4px white",
                      marginTop: "1rem",
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={URL.createObjectURL(logoImage)}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Main;
