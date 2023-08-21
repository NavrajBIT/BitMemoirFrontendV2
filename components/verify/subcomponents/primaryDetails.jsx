import style from "../certificate.module.css";
import Image from "next/image";

const PrimaryDetails = ({ usecert }) => {
  const isLoading = !usecert.certDetails || usecert.certDetails == null;

  if (isLoading) return null;

  const verificationstatus = usecert.certDetails.is_verified
    ? "verified"
    : "unverified";

  return (
    <div className={style.container}>
      <Image
        src={`/icons/${verificationstatus}.svg`}
        height={200}
        width={200}
        alt={verificationstatus}
      />
      <div
        style={{
          position: "absolute",
          top: "-2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "var(--primary-50)",
          fontSize: "3rem",
          fontWeight: "700",
        }}
      >
        {verificationstatus === "verified" ? "Verified" : "Not Verified"}
      </div>
    </div>
  );
};

export default PrimaryDetails;
