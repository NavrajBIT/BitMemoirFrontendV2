import Image from "next/image";
import style from "../template.module.css";
import Button from "@/components/subcomponents/button/button";

const FullViewTemplate = ({ cert }) => {
  const template = cert.selectedTemplate;
  return (
    <div className={style.templateViewContainer}>
      <div className={style.templateView}>
        <div className={style.templateHeading}>
          {cert.selectedTemplate.name}
        </div>
        <div className={style.buttonContainer}>
          <div className={style.innerButtonContainer}>
            <div style={{ width: "fit-content" }}>
              <Button
                text={"Edit"}
                variant={"secondary"}
                startIcon={"edit"}
                onClick={cert.editTemplate}
              />
            </div>
            <div style={{ width: "fit-content" }}>
              <Button
                text={"Delete"}
                variant={"secondary"}
                startIcon={"delete"}
                onClick={() => cert.setIsDeletePopup(true)}
              />
            </div>
          </div>
          <div>
            <Button
              text={"Issue >>"}
              variant={"primary"}
              onClick={cert.issueCert}
            />
          </div>
        </div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default FullViewTemplate;
