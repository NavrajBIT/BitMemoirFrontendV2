import Certificate from "./card";
import t from "../translation";

const Certificates = ({ orderer, ln }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--primary-100)",
        padding: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--padding-main)",
        position: "relative",
        justifyContent: "space-around",
      }}
    >
      {orderer.orderDetails.certificates.map((cert, index) => (
        <Certificate
          canEdit={orderer.orderDetails.modelStatus === "pending"}
          cert={cert}
          index={index}
          setCertPopup={orderer.setcertificatedetailsPopup}
          selectCert={orderer.setSelectedCertId}
          key={"my-certificate-" + index}
          ln={ln}
        />
      ))}
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
        {t["Certificates"][ln]}
      </div>
    </div>
  );
};

export default Certificates;
