"use client";
import PrimaryDetails from "./subcomponents/primaryDetails";
import Issuer from "./subcomponents/issuer";
import Receiver from "./subcomponents/receiver";
import CertImage from "./subcomponents/certImage";
import Advertisment from "./subcomponents/advertisment";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import style from "./certificate.module.css";
import usecertificate from "./usecertificate";

const Certificate = ({ params }) => {
  const router = useRouter();
  const usecert = usecertificate(params);
  return (
    <div
      style={{
        width: "100%",
        minHeight: "var(--min-height-screen)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-large)",
      }}
    >
      <div className={style.container} style={{ background: "transparent" }}>
        <div style={{ width: "fit-content" }}>
          <Button
            text={"< Back"}
            variant={"tertiary"}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
            onClick={() => router.back()}
          />
        </div>
      </div>
      <PrimaryDetails usecert={usecert} />

      <div className={style.details}>
        <Issuer usecert={usecert} />
        <Receiver usecert={usecert} />
      </div>
      <CertImage usecert={usecert} />
      <Advertisment />
    </div>
  );
};

export default Certificate;
