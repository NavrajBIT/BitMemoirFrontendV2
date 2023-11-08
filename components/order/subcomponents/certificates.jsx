import Certificate from "./card";

const Certificates = ({ orderer }) => {
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
        Certificates
      </div>
    </div>
  );
};

export default Certificates;
