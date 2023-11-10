import Image from "next/image";
import style from "../template.module.css";
import { useState } from "react";
import t from "../translation";

const TemplateBar = ({ cert, ln }) => {
  return (
    <div className={style.templateBar}>
      <div className={style.recentlyUsedContainer}>
        <div className={style.heading}>{t["Templates"][ln]}</div>
        <div className={style.templateContainer}>
          <CreateNewTemplate cert={cert} ln={ln} />
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
        </div>
      </div>
    </div>
  );
};

export default TemplateBar;

const CreateNewTemplate = ({ cert, ln }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={cert.createNewTemplate}
    >
      <Image
        src={"/icons/add.svg"}
        width={140}
        height={105}
        alt={"Create New Template"}
        className={style.template}
      />
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "0%",
          background: "var(--primary-60)",
          borderRadius: "var(--border-radius)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          padding: "var(--padding-light)",
          textAlign: "center",
          display: isHovered ? "flex" : "none",
          cursor: "context-menu",
        }}
      >
        {ln === "en" && "Create New template"}
        {ln === "es" && "Crear nueva plantilla"}
        {ln === "ar" && "إنشاء قالب جديد"}
      </div>
    </div>
  );
};
