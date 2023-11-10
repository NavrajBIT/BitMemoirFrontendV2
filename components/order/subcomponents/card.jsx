import Image from "next/image";
import style from "../order.module.css";
import { useEffect, useState } from "react";
import API from "@/components/subcomponents/scripts/apiCall";
import Button from "@/components/subcomponents/button/button";
import LinkButton from "@/components/subcomponents/button/link";

const Certificate = ({
  cert,
  index,
  canEdit,
  setCertPopup,
  selectCert,
  ln,
}) => {
  const api = API();
  const [certImage, setcertImage] = useState(null);
  const [isMinted, setIsMinted] = useState(null);
  const [emailSent, setEmailSent] = useState(null);

  const poppulatecertImage = () => {
    api.crud("GET", `certificate/${cert.id}`).then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status <= 299 && res.image !== null) {
        setcertImage(res.image);
        setEmailSent(res.email_sent);
        setIsMinted(res.is_minted);
      }
    });
  };

  useEffect(() => {
    poppulatecertImage();
    const interval = setInterval(() => {
      poppulatecertImage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.certificate}>
      <Image
        src={certImage !== null ? certImage : "/icons/imageplaceholder.svg"}
        loader={() =>
          certImage !== null ? certImage : "/icons/imageplaceholder.svg"
        }
        alt={"Certificate"}
        width={200}
        height={150}
        style={{
          borderRadius: "var(--border-radius)",
        }}
      />

      <div style={{ overflowX: "hidden" }}>
        {cert.variablevalues.map((variable, varIndex) => (
          <div key={"cert-" + index + "-var-" + varIndex}>
            <span style={{ color: "var(--primary-50)" }}>
              {variable.variable_name}
            </span>
            :{" " + variable.value}
          </div>
        ))}
        <div style={{ padding: "var(--padding-light) 0" }}>
          <div>
            <span style={{ color: "var(--primary-50)" }}>email</span>:
            {" " + cert.email}
          </div>
          <div>
            <span style={{ color: "var(--primary-50)" }}>wallet</span>:
            {" " + cert.wallet}
          </div>
        </div>
        <div>
          <span style={{ color: "var(--primary-50)" }}>Certificate Id:</span>
          {cert.id}
        </div>
        <div
          style={{
            padding: "var(--padding-light)",
            background: "var(--primary-90)",
            borderRadius: "var(--border-radius)",
          }}
        >
          <div
            style={{
              color: "var(--primary-50)",
            }}
          >
            Status:
          </div>
          <div>
            <span>Email:</span>
            {cert.email === "" && "Not Provided"}
            {cert.email !== "" && (
              <>
                {emailSent ? (
                  <span style={{ color: "green" }}>Sent</span>
                ) : (
                  <span>Pending</span>
                )}
              </>
            )}
          </div>
          <div>
            <span>Minted:</span>
            {cert.wallet === "" && "Wallet Not Provided"}
            {cert.wallet !== "" && (
              <>
                {isMinted ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : (
                  <span style={{ color: "red" }}>Pending</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={style.certButton}>
        {canEdit ? (
          <Button
            text=""
            variant={"primary"}
            endIcon={"edit"}
            onClick={() => {
              setCertPopup(true);
              selectCert(cert.id);
            }}
          />
        ) : (
          <LinkButton
            text=""
            variant={"primary"}
            endIcon={"view"}
            href={`/${ln}/certificate/${cert.id}`}
          />
        )}
        {certImage !== null && (
          <LinkButton
            text=""
            variant={"primary"}
            endIcon={"download"}
            href={certImage}
            target="blank"
          />
        )}
      </div>
    </div>
  );
};

export default Certificate;
