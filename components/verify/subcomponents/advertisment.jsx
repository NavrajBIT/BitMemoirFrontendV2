import style from "../certificate.module.css";
import LinkButton from "@/components/subcomponents/button/link";
import t from "../translation";

const Advertisment = ({ ln }) => {
  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {t["ad1"][ln]}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          maxWidth: "var(--max-width-form)",
          textAlign: "center",
        }}
      >
        {t["ad2"][ln]}
      </div>
      <div style={{ width: "fit-content" }}>
        <LinkButton
          variant="primary"
          text={t["ad3"][ln]}
          href={`/${ln}/trial`}
        />
      </div>
    </div>
  );
};

export default Advertisment;
