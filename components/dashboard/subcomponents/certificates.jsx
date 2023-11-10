import style from "../dashboard.module.css";
import Certificate from "@/components/order/subcomponents/card";
import t from "../translation";

const Certificates = ({ usedash, ln }) => {
  return (
    <div
      className={style.sectionContainer}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "var(--padding-light)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1rem",
          left: "var(--padding-main)",
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          fontWeight: "700",
        }}
      >
        {t["Certificates"][ln]}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-light)",
        }}
      >
        {usedash.certificates &&
          usedash.certificates.length > 0 &&
          usedash.certificates.map((cert, index) => (
            <Certificate
              cert={cert}
              index={index}
              key={"my-certificate-" + index}
              ln={ln}
            />
          ))}
      </div>
    </div>
  );
};

export default Certificates;
