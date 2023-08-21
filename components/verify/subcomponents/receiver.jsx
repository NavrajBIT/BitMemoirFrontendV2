import style from "../certificate.module.css";

const Receiver = ({ usecert }) => {
  return (
    <div className={style.detailContainer}>
      <div
        style={{
          position: "absolute",
          top: "-1rem",
          left: "var(--padding-main)",
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Received By
      </div>
      {usecert.certDetails &&
        usecert.certDetails.variablevalues.length > 0 &&
        usecert.certDetails.variablevalues.map((variable, index) => (
          <div key={"variable-" + index}>
            <div
              style={{
                color: "var(--primary-50)",
              }}
            >
              {variable.variable_name}:
            </div>
            <div>{variable.value}</div>
          </div>
        ))}
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Email:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.email}</div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Wallet:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.wallet}</div>
    </div>
  );
};

export default Receiver;
