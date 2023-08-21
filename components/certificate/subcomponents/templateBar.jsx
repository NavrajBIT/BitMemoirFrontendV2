import Image from "next/image";
import style from "../template.module.css";

const TemplateBar = ({ cert }) => {
  return (
    <div className={style.templateBar}>
      <div className={style.recentlyUsedContainer}>
        <div className={style.heading}>Templates</div>
        <div className={style.templateContainer}>
          {cert.templates &&
            Array.isArray(cert.templates) &&
            cert.templates.length > 0 &&
            cert.templates.map((template, index) => {
              return (
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
                  width={140}
                  height={105}
                  alt={template.name}
                  className={style.template}
                  key={template.name + "-" + index}
                  onClick={() => cert.setSelectedtemplate(template)}
                />
              );
            })}
          <Image
            src={"/icons/add.svg"}
            width={140}
            height={105}
            alt={"Create New Template"}
            className={style.template}
            onClick={cert.createNewTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateBar;
