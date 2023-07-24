import TopTool from "./topTool";
import Button from "@/components/subcomponents/button/button";
import { useRef } from "react";

const TopToolBar = ({ creator }) => {
  const imageRef = useRef();
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--template-max-width)",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-extra-light)",
        display: "flex",
        gap: "var(--padding-light)",
        alignItems: "center",
      }}
    >
      <TopTool icon="save" toolName="Save" toolDescription="Save template" />
      Template:
      <input
        type="text"
        value={creator.templateName}
        onChange={(e) => creator.setTemplateName(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--padding-light)",
          width: "100%",
        }}
      >
        Image:
        <Button
          text={
            creator.uploadedImage ? creator.uploadedImageName : "Select Image"
          }
          variant="primary"
          onClick={() => imageRef.current.click()}
          style={{
            fontSize: "0.75rem",
            padding: "var(--padding-extra-light)",
            width: "100%",
          }}
        />
      </div>
      <TopTool
        icon="remove"
        toolName="Remove"
        toolDescription="Remove base image"
        onClick={creator.removeImage}
      />
      <input
        type="file"
        ref={imageRef}
        onChange={(e) => creator.selectImage(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default TopToolBar;
