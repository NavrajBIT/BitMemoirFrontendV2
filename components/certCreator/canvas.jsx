import style from "./certCreator.module.css";
import Textvariable from "./textVariable/textvariable";
import Logo from "./logovariable/logo";
import Variable from "./variable/variable";
import Qrcode from "./qrcodevariable/qrcode";
import { useEffect } from "react";

const Canvas = ({ creator }) => {
  const canvasScale = creator.scale / 100;

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (event.target.closest('[id^="logo-handle-"]')) {
      return;
    }
    if (event.target.closest('[id^="text-handle-"]')) {
      return;
    }
    if (event.target.closest('[id^="variable-handle-"]')) {
      return;
    }
    if (event.target.closest('[id^="qr-handle-"]')) {
      return;
    }
    creator.setSelectedVariable(null);
  };

  return (
    <div
      className={style.canvas}
      style={{
        transform: `scale(${canvasScale})`,
        backgroundColor: `#${creator.templateBackground}`,
        backgroundImage: `url(${creator.uploadedImageURL})`,
      }}
      id="canvas"
    >
      {creator.variables.text.length > 0 &&
        creator.variables.text.map((text, index) => (
          <Textvariable
            data={text}
            index={index}
            setVariables={creator.setVariables}
            setSelectedVariable={creator.setSelectedVariable}
            key={"text-variable-" + index}
            id={"text-variable-" + index}
          />
        ))}
      {creator.variables.logo.length > 0 &&
        creator.variables.logo.map((logo, index) => (
          <Logo
            index={index}
            data={logo}
            setVariables={creator.setVariables}
            selectedVariable={creator.selectedVariable}
            setSelectedVariable={creator.setSelectedVariable}
            key={"logo-variable-" + index}
          />
        ))}
      {creator.variables.variable.length > 0 &&
        creator.variables.variable.map((vardata, index) => (
          <Variable
            index={index}
            data={vardata}
            setVariables={creator.setVariables}
            selectedVariable={creator.selectedVariable}
            setSelectedVariable={creator.setSelectedVariable}
            key={"variable-" + index}
          />
        ))}
      {creator.variables.qrcode.length > 0 &&
        creator.variables.qrcode.map((qr, index) => (
          <Qrcode
            index={index}
            data={qr}
            setVariables={creator.setVariables}
            selectedVariable={creator.selectedVariable}
            setSelectedVariable={creator.setSelectedVariable}
            key={"qrcode-variable-" + index}
          />
        ))}
    </div>
  );
};

export default Canvas;
