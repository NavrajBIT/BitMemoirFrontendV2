import style from "../certificate.module.css";

const Issuer = ({ usecert }) => {
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
        Issued By
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        {usecert.certDetails && usecert.certDetails.issuer.name}
      </div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Address:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.issuer.address}</div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Country:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.issuer.country}</div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Website:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.issuer.website}</div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Description:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.issuer.description}</div>
      <div
        style={{
          color: "var(--primary-50)",
        }}
      >
        Account Id:
      </div>
      <div>{usecert.certDetails && usecert.certDetails.issuer.wallet}</div>
    </div>
  );
};

export default Issuer;
