"use client";
import TrialForm from "./trialForm";
import usekyc from "../kyc/usekyc";
import TermsPopup from "./termsPopup";
import API from "../subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";
import LinkButton from "../subcomponents/button/link";
import LocalLoading from "../subcomponents/loadingPage/localloading";

const Trial = () => {
  const script = usekyc();
  const api = API();
  const [trial, setTrial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    poppulateTrial();
  }, []);

  const poppulateTrial = async () => {
    setIsLoading(true);
    await api.crud("GET", "subscription/trial").then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status <= 299) {
        setTrial(res[0]);
      }
    });
    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading && <LocalLoading />}
      {trial !== null && !trial.is_active && <TrialForm usekyc={script} />}
      {trial !== null && trial.is_active && (
        <div
          style={{
            maxWidth: "var(--max-width-form)",
            background: "var(--primary-100)",
            padding: "var(--padding-main)",
            borderRadius: "var(--border-radius)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
            Free Trial is already used.
          </div>
          <div style={{ textAlign: "center" }}>
            Free Trial Balance : {trial.nft_quota}
          </div>
          <div style={{ textAlign: "center" }}>
            For further assistance, please write to support@beimagine.tech
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "var(--padding-main)",
            }}
          >
            <LinkButton text="Dashboard" href="/dashboard" variant="primary" />
            <LinkButton text="Home" href="/home" variant="primary" />
          </div>
        </div>
      )}
      {script.kycStatus && script.kycStep > 1 && (
        <TermsPopup usekyc={script} setIsLoading={setIsLoading} />
      )}
    </div>
  );
};

export default Trial;
