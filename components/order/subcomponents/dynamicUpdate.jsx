import Button from "@/components/subcomponents/button/button";

const DynamicUpdate = ({ update }) => {
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
        Update Certificates
      </div>
      <div>This order contains Dynamic certificates</div>
      <div style={{ width: "fit-content" }}>
        <Button
          variant={"primary"}
          text="Update"
          endIcon={"update"}
          onClick={update}
        />
      </div>
    </div>
  );
};

export default DynamicUpdate;
