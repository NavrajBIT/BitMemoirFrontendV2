import PrimaryDetails from "./subcomponents/primaryDetails";
import Issuer from "./subcomponents/issuer";
import Receiver from "./subcomponents/receiver";
import CertImage from "./subcomponents/certImage";
import Advertisment from "./subcomponents/advertisment";
import style from "./certificate.module.css";
import useCIDcertificate from "./usecidCertificate";
import Image from "next/image";

const CIDCertificate = async ({ params }) => {
  const usecert = await useCIDcertificate(params);

  if (!usecert.certDetails)
    return (
      <div
        style={{
          width: "100%",
          minHeight: "var(--min-height-screen)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-main)",
          wordWrap: "break-word",
        }}
      >
        <Image
          src={`/icons/unverified.svg`}
          height={250}
          width={250}
          alt={"Unverified"}
        />

        <div
          style={{
            color: "var(--primary-50)",
            fontSize: "3rem",
            fontWeight: "700",
          }}
        >
          Unverified
        </div>
      </div>
    );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "var(--min-height-screen)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-large)",
        wordWrap: "break-word",
      }}
    >
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

export default CIDCertificate;
