"use client";
import Popup from "../subcomponents/popup/popup";
import SubscriptionCard from "./subscriptionCard";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";
import { useEffect, useState } from "react";
import FreetrialButton from "../home/subcomponents/freetrialButton";

const PlanExpired = ({ ln }) => {
  const router = useRouter();
  const api = API();
  const [trial, setTrial] = useState(false);
  const [nftQuota, setNftQuota] = useState(null);

  useEffect(() => {
    poppulateNFTQuota();
    api
      .crud("GET", "subscription/trial")
      .then((res) => {
        if (res.status === 200) setTrial(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const poppulateNFTQuota = async () => {
    await api
      .crud("GET", `subscription/nftQuota`)
      .then((res) => {
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          setNftQuota(parseInt(res.nft_quota));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Popup>
      <div
        style={{
          maxWidth: "var(--max-width)",
          background: "var(--primary-100)",
          borderRadius: "var(--border-radius)",
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-main)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
        >
          <Button
            text="X"
            variant={"primary"}
            onClick={() => router.back()}
            style={{ background: "var(--error)", border: "none" }}
          />
        </div>
        <div
          style={{
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
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          {ln === "en" &&
            "You do not have enough Certificate balance to proceed."}
          {ln === "es" &&
            "No tiene suficiente saldo de certificado para continuar."}
          {ln === "ar" && "ليس لديك رصيد كافٍ من الشهادة للمتابعة."}
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          {ln === "en" && "Current certificate Balance ="}
          {ln === "es" && "Saldo del certificado actual ="}
          {ln === "ar" && "رصيد الشهادة الحالية ="} {nftQuota}
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--padding-main)",
            flexWrap: "wrap",
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
        {!trial.is_active && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--padding-light)",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              {ln === "en" && "Start Free Trial"}
              {ln === "es" && "Empiza la prueba gratuita"}
              {ln === "ar" && "ابدأ النسخة التجريبية المجانية"}
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              {ln === "en" && (
                <>
                  Get {process.env.NEXT_PUBLIC_FREE_CERTS} certificates for
                  free.
                </>
              )}
              {ln === "en" && (
                <>
                  Obtenga {process.env.NEXT_PUBLIC_FREE_CERTS} certificados
                  gratis.
                </>
              )}
              {ln === "en" && (
                <>
                  احصل على {process.env.NEXT_PUBLIC_FREE_CERTS} شهادات مجاناً.
                </>
              )}
            </div>
            <FreetrialButton ln={ln} />
          </div>
        )}
      </div>
    </Popup>
  );
};

export default PlanExpired;
