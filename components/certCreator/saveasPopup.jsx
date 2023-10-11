import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import { useState } from "react";
import { LocalInputField } from "../subcomponents/form/form";

const SaveAsPopup = ({ creator }) => {
  const [templateName, setTemplateName] = useState(
    `${creator.templateName}_copy`
  );
  return (
    <Popup>
      <div
        style={{
          width: "100%",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          gap: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          Save Template As
        </div>
        <div>
          Duplicate {'"'}
          {creator.templateName}
          {'"'} template and create a new template file.
        </div>
        <LocalInputField
          inputData={{ label: "Template Name", type: "text" }}
          value={templateName}
          handleChange={(e) => setTemplateName(e.target.value)}
          maxLength={50}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <Button
              text="Cancel X"
              variant={"secondary"}
              onClick={() => {
                creator.setsaveaspopup(false);
              }}
            />
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              text="Save"
              variant={"primary"}
              endIcon={"saveas"}
              onClick={() => {
                creator.setsaveaspopup(false);
                creator.saveas(templateName);
              }}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SaveAsPopup;
