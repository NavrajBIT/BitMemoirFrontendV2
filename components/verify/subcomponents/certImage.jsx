import style from "../certificate.module.css";
import Image from "next/image";
import Button from "@/components/subcomponents/button/button";
import Link from "next/link";
import { useRef } from "react";

const CertImage = ({ usecert }) => {
  const downloadref = useRef(null);
  const imagesrc = usecert.certDetails
    ? usecert.certDetails.image
      ? usecert.certDetails.image
      : "/icons/imageplaceholder.svg"
    : "/icons/imageplaceholder.svg";
  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
      }}
    >
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
        Certificate
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--template-width)",
          aspectRatio: "4/3",
          position: "relative",
        }}
      >
        <Image
          src={imagesrc}
          loader={() => imagesrc}
          alt={"Certificate"}
          fill={true}
          className={style.previewimage}
        />
      </div>
      <div style={{ width: "fit-content" }}>
        <Button
          text="Download"
          variant="primary"
          endIcon={"download"}
          onClick={() => downloadref.current.click()}
        />
        <Link
          href={imagesrc}
          target="_blank"
          ref={downloadref}
          style={{ display: "none" }}
        >
          Download
        </Link>
      </div>
    </div>
  );
};

export default CertImage;
