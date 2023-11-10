"use client";
import TrialForm from "./trialForm";
import usekyc from "../kyc/usekyc";
import TermsPopup from "./termsPopup";
import API from "../subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";
import LinkButton from "../subcomponents/button/link";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import SubscriptionCard from "../subscriptions/subscriptionCard";

const Trial = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
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
            // maxWidth: "var(--max-width-form)",
            background: "var(--primary-100)",
            padding: "var(--padding-main)",
            borderRadius: "var(--border-radius)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
            {ln === "en" && "Free Trial Plan is already being used."}
            {ln === "es" && "El plan de prueba gratuito ya se está utilizando."}
            {ln === "ar" && "الخطة التجريبية المجانية قيد الاستخدام بالفعل."}
          </div>
          <div style={{ textAlign: "center" }}>
            {ln === "en" && "Free Trial Balance :"}
            {ln === "es" && "Saldo de prueba gratuito:"}
            {ln === "ar" && "رصيد النسخة التجريبية المجانية :"}
            {trial.nft_quota}
          </div>
          <div
            style={{
              width: "100%",
              color: "var(--primary-50)",
              fontSize: "2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {ln === "en" && "Subscription Plans"}
            {ln === "es" && "Planes de suscripción"}
            {ln === "ar" && "خطط الاشتراك"}
          </div>
          <div
            style={{
              maxWidth: "var(--max-width)",
              background: "var(--primary-100)",
              borderRadius: "var(--border-radius)",
              padding: "var(--padding-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--padding-main)",
              flexWrap: "wrap",
              position: "relative",
              padding: "var(--padding-main)",
            }}
          >
            <SubscriptionCard
              title="Silver"
              certificates={100}
              price={2}
              ln={ln}
            />
            <SubscriptionCard
              title="Gold"
              certificates={500}
              price={1.75}
              ln={ln}
            />
            <SubscriptionCard
              title="Platinum"
              certificates={1000}
              price={1.5}
              ln={ln}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            {ln === "en" &&
              "For further assistance, please write to support@beimagine.tech"}
            {ln === "es" &&
              "Para obtener más ayuda, escriba a support@beimagine.tech"}
            {ln === "ar" &&
              "لمزيد من المساعدة، يرجى الكتابة إلى support@beimagine.tech"}
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
