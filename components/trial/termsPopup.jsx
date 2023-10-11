import Popup from "../subcomponents/popup/popup";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";
import LocalLoading from "../subcomponents/loadingPage/localloading";

const TermsPopup = ({ usekyc, setIsLoading }) => {
  const router = useRouter();
  const api = API();
  const [trialStarted, settrialStarted] = useState(false);
  useEffect(() => {
    startFreeTrial();
  }, []);
  const startFreeTrial = async () => {
    setIsLoading(true);
    await api
      .crud("POST", "subscription/startTrial")
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          if (res.modelStatus === "Success") {
            settrialStarted(true);
          }
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  if (!trialStarted) return <LocalLoading />;

  return (
    <Popup>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--padding-main)",
          gap: "var(--padding-light)",
          background: "var(--primary-100)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          Congratulations!
        </div>
        <div>
          You have received {process.env.NEXT_PUBLIC_FREE_CERTS} free
          Certificates.
        </div>
        {usekyc.kycStatus.status !== "Approved" && (
          <div style={{ color: "var(--error)" }}>
            Warning! The certificates in free trial are not verified without
            KYC.
          </div>
        )}
        {usekyc.kycStatus.status !== "Approved" ? (
          <div
            style={{
              display: "flex",
              gap: "var(--padding-light)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "fit-content" }}>
              <Button
                text="Complete KYC"
                variant={"primary"}
                onClick={() => router.push("/kyc")}
              />
            </div>
            <div style={{ width: "fit-content" }}>
              <Button
                text="Continue Anyway"
                variant={"secondary"}
                onClick={() => router.push("/certificate")}
                endIcon={"arrow-right"}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "var(--padding-light)",
              flexWrap: "wrap",
            }}
          >
            <Button
              text="Issue Certificates"
              variant={"primary"}
              onClick={() => router.push("/certificate")}
              endIcon={"createCert"}
            />
            <Button
              text="Issue Souvenirs"
              variant={"secondary"}
              onClick={() => router.push("/souvenir")}
              endIcon={"arrow-right"}
            />
          </div>
        )}
      </div>
    </Popup>
  );
};

export default TermsPopup;
