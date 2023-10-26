import TopTool from "./topTool";
import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { useRef, useState } from "react";
import Slider from "@/components/subcomponents/slider/slider";
import style from "../certCreator.module.css";
import { useRouter } from "next/navigation";
import LinkButton from "@/components/subcomponents/button/link";

const TopToolBar = ({ creator, templateId }) => {
  const imageRef = useRef();
  const router = useRouter();
  return (
    <div className={style.toptoolContainer}>
      <div style={{ width: "fit-content" }}>
        <Button
          text="<<Back"
          variant={"primary"}
          style={{
            fontSize: "1rem",
          }}
          onClick={async () => {
            await creator.save();
            if (creator.variables.qrcode.length === 0) {
              creator.setNoQR(true);
            } else {
              router.back();
            }
          }}
        />
      </div>
      <TopTool
        icon="save"
        toolName="Save"
        toolDescription="Save template"
        onClick={creator.save}
      />
      <TopTool
        icon="saveas"
        toolName="Save As"
        toolDescription="Duplicate template to another file"
        onClick={() => creator.setsaveaspopup(true)}
      />
      Template:
      <LocalInputField
        inputData={{ type: "text", label: "" }}
        value={creator.templateName}
        handleChange={(e) => creator.setTemplateName(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--padding-light)",
          width: "100%",
          maxWidth: "200px",
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
            fontSize: "1rem",
          }}
        />
      </div>
      <TopTool
        icon="remove"
        toolName="Remove"
        toolDescription="Remove base image"
        onClick={creator.removeImage}
      />
      <ScaleTool creator={creator} />
      <div style={{ width: "fit-content" }}>
        <LinkButton
          text="Issue>>"
          variant={"primary"}
          style={{
            fontSize: "1rem",
          }}
          href={`/issue/${templateId}`}
        />
      </div>
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

const ScaleTool = ({ creator }) => {
  return (
    <div style={{ display: "flex" }}>
      <Slider
        value={creator.scale}
        valueDisplay={`Size: ${creator.scale}%`}
        handleChange={(e) => creator.setScale(e.target.value)}
      />
    </div>
  );
};
