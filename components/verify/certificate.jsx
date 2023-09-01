import PrimaryDetails from "./subcomponents/primaryDetails";
import Issuer from "./subcomponents/issuer";
import Receiver from "./subcomponents/receiver";
import CertImage from "./subcomponents/certImage";
import Advertisment from "./subcomponents/advertisment";
import style from "./certificate.module.css";
import usecertificate from "./usecertificate";
import NotFound from "../subcomponents/errorPages/notFound";

const Certificate = async ({ params }) => {
  const usecert = await usecertificate(params);

  if (!usecert.certDetails) return <NotFound />;

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