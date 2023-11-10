import Button from "@/components/subcomponents/button/button";
import t from "../translation";
const DynamicUpdate = ({ update, ln }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--primary-100)",
        padding: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "1.5rem",
          fontWeight: "bold",
          top: "-1rem",
          left: "var(--padding-main)",
          color: "var(--primary-50)",
        }}
      >
        {t["Update Certificates"][ln]}
      </div>
      <div>{t["This order contains Dynamic certificates"][ln]}</div>
      <div style={{ width: "fit-content" }}>
        <Button
          variant={"primary"}
          text={t["Update"][ln]}
          endIcon={"update"}
          onClick={update}
        />
      </div>
    </div>
  );
};

export default DynamicUpdate;
