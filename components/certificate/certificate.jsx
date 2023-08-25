"use client";
import TemplateBar from "./subcomponents/templateBar";
import Arrow from "./subcomponents/arrow";
import FullViewTemplate from "./subcomponents/fullViewTemplate";
import usecertificate from "./usecertificate";
import style from "./template.module.css";
import DeletePopup from "./subcomponents/deletePopup";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import TutorialPopup from "../certCreator/tutorialPopup";

const Certificate = () => {
  const cert = usecertificate();

  return (
    <div className={style.certificateContainer}>
      <TemplateBar cert={cert} />
      {cert.selectedTemplate === null ? (
        <Arrow />
      ) : (
        <FullViewTemplate cert={cert} />
      )}
      {cert.isDeletePopup && <DeletePopup cert={cert} />}
      {cert.isLoading && <LocalLoading />}
      <TutorialPopup />
    </div>
  );
};

export default Certificate;
