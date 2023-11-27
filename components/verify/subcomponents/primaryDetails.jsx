import Button from "@/components/subcomponents/button/button";
import style from "../certificate.module.css";
import Image from "next/image";
import Link from "next/link";
import { getTime } from "@/components/subcomponents/scripts/scripts";
import update from "./verificationKpiUpdate";

const PrimaryDetails = ({ usecert, ln }) => {
  const translation = {
    verified: { en: "Verified", es: "Verificado", ar: "تم التحقق" },
    unverified: {
      en: "Unverified",
      es: "Inconfirmado",
      ar: "لم يتم التحقق منها",
    },
  };

  const verificationstatus = usecert.certDetails.is_verified
    ? "verified"
    : "unverified";

  update(usecert.certDetails.id);

  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "var(--padding-main)",
      }}
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
        {translation[verificationstatus][ln]}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div>Issued at: {getTime(usecert.certDetails.timestamp)}</div>
        <br />
        <div>Certificate id: {usecert.certDetails.id}</div>
        <div style={{ width: "100%" }}>
          CID:
          {usecert.certDetails.cid}
        </div>
        {usecert.txId && (
          <div style={{ width: "100%" }}>Tx Id: {usecert.txId.tx_id}</div>
        )}
        {usecert.txId && (
          <Link
            href={process.env.NEXT_PUBLIC_EXPLORER + usecert.txId.tx_id}
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
