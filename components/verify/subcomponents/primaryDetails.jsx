import style from "../certificate.module.css";
import Image from "next/image";
import Button from "@/components/subcomponents/button/button";
import Link from "next/link";

const PrimaryDetails = ({ usecert }) => {
  const isLoading = !usecert.certDetails || usecert.certDetails == null;

  if (isLoading) return null;

  const verificationstatus = usecert.certDetails.is_verified
    ? "verified"
    : "unverified";

  return (
    <div
      className={style.container}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
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
        {verificationstatus === "verified" ? "Verified" : "Unverified"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div>Certificate id: {usecert.certDetails.id}</div>
        <div>CID: {usecert.certDetails.cid}</div>
        {usecert.txId && <div>Tx Id: {usecert.txId}</div>}
        {usecert.txId && (
          <Link
            href={process.env.NEXT_PUBLIC_EXPLORER + usecert.txId}
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              color: "var(--primary-50)",
            }}
          >
            Explorer{" "}
            <Image
              src={"/icons/new-tab.svg"}
              width={25}
              height={25}
              alt="explorer"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PrimaryDetails;
