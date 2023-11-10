import Popup from "../subcomponents/popup/popup";
import Draganddrop from "../subcomponents/draganddrop/draganddrop";
import Button from "../subcomponents/button/button";
import { LocalInputField } from "../subcomponents/form/form";
import { useState } from "react";

const AddPopup = ({ script, ln }) => {
  const [framename, setFramename] = useState("");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedFrameURL, setSelectedFrameURL] = useState(null);

  const selectFrame = (file) => {
    setSelectedFrame(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFrameURL(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width-form)",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          borderRadius: "var(--border-radius)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
          Add Frame
        </div>
        <Draganddrop submitFile={selectFrame} file={selectedFrameURL} ln={ln} />
        <LocalInputField
          inputData={{ label: "Frame Name", type: "text" }}
          maxLength={100}
          value={framename}
          handleChange={(e) => setFramename(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "var(--padding-light)",
            width: "100%",
          }}
        >
          {selectedFrame && framename !== "" && (
            <Button
              text={"Save"}
              variant={"primary"}
              endIcon={"save"}
              onClick={() => script.addFrame(selectedFrame, framename)}
            />
          )}
          <Button
            text={"Cancel X"}
            variant={"secondary"}
            onClick={() => script.setframePopup(false)}
          />
        </div>
      </div>
    </Popup>
  );
};

export default AddPopup;
