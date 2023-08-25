import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "../order.module.css";
import { useEffect, useState } from "react";
import API from "@/components/subcomponents/scripts/apiCall";

const Certificate = ({ cert, index }) => {
  const router = useRouter();
  const api = API();
  const [certImage, setcertImage] = useState(null);
  const [certStatus, setcertStatus] = useState(null);

  const poppulatecertImage = () => {
    api.crud("GET", `certificate/${cert.id}`).then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status <= 299 && res.image !== null) {
        setcertImage(res.image);
        if (res.modelStatus !== null) {
          setcertStatus(res.modelStatus);
        }
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

  const statusData = {
    pending: { color: "var(--primary-50)", text: "Pending" },
    error: { color: "red", text: "Error" },
    issued: { color: "green", text: "Issued" },
  };

  return (
    <div
      className={style.certificate}
      onClick={() => router.push(`/certificate/${cert.id}`)}
    >
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

      {certStatus && certStatus !== null && (
        <div style={{ color: statusData[certStatus]["color"] }}>
          {statusData[certStatus]["text"]}
        </div>
      )}

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
                {cert.email_sent ? (
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
                {cert.is_minted ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : (
                  <span style={{ color: "red" }}>Pending</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
