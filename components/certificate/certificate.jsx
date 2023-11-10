"use client";
import TemplateBar from "./subcomponents/templateBar";
import Arrow from "./subcomponents/arrow";
import FullViewTemplate from "./subcomponents/fullViewTemplate";
import usecertificate from "./usecertificate";
import style from "./template.module.css";
import DeletePopup from "./subcomponents/deletePopup";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import TutorialPopup from "../certCreator/tutorialPopup";

const Certificate = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const cert = usecertificate(ln);

  return (
    <div className={style.certificateContainer}>
      <TemplateBar cert={cert} ln={ln} />
      {cert.selectedTemplate === null ? (
        <Arrow ln={ln} />
      ) : (
        <FullViewTemplate cert={cert} ln={ln} />
      )}
      {cert.isDeletePopup && <DeletePopup cert={cert} />}
      {cert.isLoading && <LocalLoading />}
      <TutorialPopup ln={ln} />
    </div>
  );
};

export default Certificate;
