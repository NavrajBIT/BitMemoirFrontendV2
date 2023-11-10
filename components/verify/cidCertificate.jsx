import PrimaryDetails from "./subcomponents/primaryDetails";
import Issuer from "./subcomponents/issuer";
import Receiver from "./subcomponents/receiver";
import CertImage from "./subcomponents/certImage";
import Advertisment from "./subcomponents/advertisment";
import style from "./certificate.module.css";
import useCIDcertificate from "./usecidCertificate";
import Image from "next/image";

const CIDCertificate = async ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
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
          {ln === "en" && "Unverified"}
          {ln === "es" && "Inconfirmado"}
          {ln === "ar" && "لم يتم التحقق منها"}
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
      <PrimaryDetails usecert={usecert} ln={ln} />

      <div className={style.details}>
        <Issuer usecert={usecert} ln={ln} />
        <Receiver usecert={usecert} ln={ln} />
      </div>
      <CertImage usecert={usecert} ln={ln} />
      <Advertisment ln={ln} />
    </div>
  );
};

export default CIDCertificate;
