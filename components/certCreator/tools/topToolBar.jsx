import TopTool from "./topTool";
import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { useRef, useState } from "react";
import Slider from "@/components/subcomponents/slider/slider";
import style from "../certCreator.module.css";
import { useRouter } from "next/navigation";
import LinkButton from "@/components/subcomponents/button/link";
import t from "../translation";

const TopToolBar = ({ creator, templateId, dynamic, orderId, ln }) => {
  const imageRef = useRef();
  const router = useRouter();
  return (
    <div className={style.toptoolContainer}>
      <div style={{ width: "fit-content" }}>
        <Button
          text={"<<" + t["Back"][ln]}
          variant={"primary"}
          style={{
            fontSize: "1rem",
          }}
          onClick={async () => {
            await creator.save();
            if (creator.variables.qrcode.length === 0) {
              creator.setNoQR(true);
            } else {
              if (dynamic) router.push(`/${ln}/order/${orderId}`);
              else router.push(`/${ln}/certificate`);
            }
          }}
        />
      </div>
      <TopTool
        icon="save"
        toolName={t["Save"][ln]}
        toolDescription={t["SaveDesc"][ln]}
        onClick={creator.save}
      />
      {!dynamic && (
        <TopTool
          icon="saveas"
          toolName={t["Save As"][ln]}
          toolDescription={t["SaveAsDesc"][ln]}
          onClick={() => creator.setsaveaspopup(true)}
        />
      )}
      {t["Template"][ln]}:
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
        {t["Image"][ln]}:
        <Button
          text={
            creator.uploadedImage
              ? creator.uploadedImageName
              : t["Select Image"][ln]
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
        toolName={t["Remove"][ln]}
        toolDescription={t["RemoveDesc"][ln]}
        onClick={creator.removeImage}
      />
      <ScaleTool creator={creator} ln={ln} />
      <div style={{ width: "fit-content" }}>
        <Button
          text={t["Next"][ln] + " >>"}
          variant={"primary"}
          style={{
            fontSize: "1rem",
          }}
          onClick={async () => {
            await creator.save();
            if (creator.variables.qrcode.length === 0) {
              creator.setNoQR(true);
            } else {
              if (dynamic) router.push(`/${ln}/order/update/data/${orderId}`);
              else router.push(`/${ln}/issue/${templateId}`);
            }
          }}
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

const ScaleTool = ({ creator, ln }) => {
  return (
    <div style={{ display: "flex" }}>
      <Slider
        value={creator.scale}
        valueDisplay={`${t["Size"][ln]}: ${creator.scale}%`}
        handleChange={(e) => creator.setScale(e.target.value)}
      />
    </div>
  );
};
