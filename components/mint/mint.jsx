import CreateButton from "./createButton";

const Mint = () => {
  return (
    <div
      style={{
        minHeight: "var(--min-height)",
        maxWidth: "var(--max-width)",
        margin: "auto",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        Issue Certificates
      </div>
      <CreateButton />
    </div>
  );
};

export default Mint;
