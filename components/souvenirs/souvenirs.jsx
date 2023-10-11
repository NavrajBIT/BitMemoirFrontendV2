"use client";
import useSouvenirs from "./usesouvenirs";
import style from "./souvenir.module.css";
import Draganddrop from "../subcomponents/draganddrop/draganddrop";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import Button from "../subcomponents/button/button";
import Select from "../subcomponents/select/select";
import { LocalInputField } from "../subcomponents/form/form";
import AddPopup from "./addPopup";
import PreviewPopup from "./previewpopup";
import StatusPopup from "./statusPopup";
import PlanExpired from "../subscriptions/planExpired";

const Souvenirs = () => {
  const script = useSouvenirs();

  const frames = [];

  if (script.frames) {
    script.frames.map((frm) => {
      frames.push({ name: frm.frame_name, value: frm.id });
    });
  }

  frames.push({ name: "Add Frame", value: "add" });

  const canIssue =
    script.image && script.certId && (script.accountId || script.email);

  return (
    <div className={style.formcontainer}>
      {script.isLoading && <LocalLoading />}
      <div className={style.formoverlay} />
      <div className={style.formTitle}>Souvenir</div>
      <Draganddrop submitFile={script.handleImageUpload} file={script.image} />
      Please select a high quality image of 4/3 aspect ratio.
      <Select
        title="Select Frame"
        options={frames}
        submit={(e) => {
          if (e === "add") {
            script.setframePopup(true);
          } else {
            script.frames.map((frm) => {
              if (frm.id == e) {
                script.setSelectedframe(frm);
              }
            });
          }
        }}
      />
      <LocalInputField
        inputData={{ label: "Account ID", type: "text" }}
        maxLength={100}
        value={script.accountId}
        handleChange={(e) => script.setAccountId(e.target.value)}
      />
      <LocalInputField
        inputData={{ label: "Email", type: "email" }}
        maxLength={100}
        value={script.email}
        handleChange={(e) => script.setEmail(e.target.value)}
      />
      <div style={{ display: "flex", gap: "var(--padding-light)" }}>
        {canIssue && (
          <Button
            variant={"primary"}
            text="Issue"
            onClick={script.publishSouvenir}
          />
        )}
        {script.image && (
          <Button
            variant={"secondary"}
            text="Preview"
            onClick={() => script.setPreviewPopup(true)}
          />
        )}
      </div>
      {script.framePopup && <AddPopup script={script} />}
      {script.previewPopup && <PreviewPopup script={script} />}
      {script.status !== "" && <StatusPopup script={script} />}
      {script.nftQuota !== null && script.nftQuota === 0 && <PlanExpired />}
    </div>
  );
};

export default Souvenirs;
