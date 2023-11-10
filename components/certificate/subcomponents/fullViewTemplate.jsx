import Image from "next/image";
import style from "../template.module.css";
import Button from "@/components/subcomponents/button/button";
import { useState } from "react";

const FullViewTemplate = ({ cert, ln }) => {
  const template = cert.selectedTemplate;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
    setTimeout(() => setIsClicked(false), 3000);
  };

  return (
    <div className={style.templateViewContainer}>
      <div className={style.templateView}>
        <div className={style.previewimageContainer}>
          <Image
            src={
              template.icon !== null
                ? template.icon
                : "/icons/imageplaceholder.svg"
            }
            loader={() =>
              template.icon !== null
                ? template.icon
                : "/icons/imageplaceholder.svg"
            }
            alt={"Certificate"}
            fill={true}
            className={style.previewimage}
            onClick={handleClick}
          />
          {!isClicked && <ButtonContainer cert={cert} />}

          {!isClicked && <ToolBar cert={cert} ln={ln} />}
        </div>
      </div>
    </div>
  );
};

export default FullViewTemplate;

const ButtonContainer = ({ cert }) => (
  <div className={style.innerButtonContainer}>
    <div style={{ width: "fit-content" }}>
      <Button
        text={""}
        variant={"primary"}
        startIcon={"edit"}
        onClick={cert.editTemplate}
      />
    </div>
    <div style={{ width: "fit-content" }}>
      <Button
        text={""}
        variant={"primary"}
        startIcon={"delete"}
        onClick={() => cert.setIsDeletePopup(true)}
      />
    </div>
  </div>
);

const ToolBar = ({ cert, ln }) => (
  <div className={style.toolbar}>
    <div className={style.templateHeading}>{cert.selectedTemplate.name}</div>
    <div style={{ width: "fit-content" }}>
      <Button
        text={ln === "en" ? "Issue" : ln === "es" ? "Asunto" : "مشكلة" + ">>"}
        variant={"primary"}
        onClick={cert.issueCert}
      />
    </div>
  </div>
);
