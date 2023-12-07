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

const Souvenirs = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const script = useSouvenirs();

  const frames = [];

  frames.push({ name: ln === "es" ? "Ninguno" : "None", value: "none" });
  if (script.frames) {
    script.frames.map((frm) => {
      frames.push({ name: frm.frame_name, value: frm.id });
    });
  }

  frames.push({
    name: ln === "es" ? "Añadir marco" : "Add Frame",
    value: "add",
  });

  const canIssue =
    script.image && script.certId && (script.accountId || script.email);

  return (
    <div className={style.formcontainer}>
      {script.isLoading && <LocalLoading />}
      <div className={style.formoverlay} />
      <div className={style.formTitle}>
        {ln === "en" && "Souvenir"}
        {ln === "es" && "Recuerdo"}
        {ln === "ar" && "تذكار"}
      </div>
      <Draganddrop
        submitFile={script.handleImageUpload}
        file={script.image}
        ln={ln}
      />
      {ln === "en" && "Please select a high quality image of 4/3 aspect ratio."}
      {ln === "es" &&
        "Seleccione una imagen de alta calidad con una relación de aspecto de 4/3."}
      {ln === "ar" &&
        "يرجى اختيار صورة ذات جودة عالية بنسبة عرض إلى ارتفاع 4/3."}

      <Select
        title={ln === "es" ? "Seleccionar marco" : "Select Frame"}
        options={frames}
        submit={(e) => {
          if (e === "add") {
            script.setframePopup(true);
          }
          if (e === "none") {
            script.setSelectedframe(null);
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
        inputData={{
          label: ln === "es" ? "Número de Cuenta" : "Account ID",
          type: "text",
        }}
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
      {script.framePopup && <AddPopup script={script} ln={ln} />}
      {script.previewPopup && <PreviewPopup script={script} />}
      {script.status !== "" && <StatusPopup script={script} />}
      {script.nftQuota !== null && script.nftQuota === 0 && (
        <PlanExpired ln={ln} />
      )}
    </div>
  );
};

export default Souvenirs;
