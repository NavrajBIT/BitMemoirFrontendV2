"use client";
import Popup from "../subcomponents/popup/popup";
import SubscriptionCard from "./subscriptionCard";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";
import { useEffect, useState } from "react";
import FreetrialButton from "../home/subcomponents/freetrialButton";

const PlanExpired = () => {
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
          Subscription Plans
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          You do not have enough Certificate balance to proceed.
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          Current certificate Balance = {nftQuota}
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--padding-main)",
            flexWrap: "wrap",
          }}
        >
          <SubscriptionCard title="Silver" certificates={100} price={2} />
          <SubscriptionCard title="Gold" certificates={500} price={1.75} />
          <SubscriptionCard title="Platinum" certificates={1000} price={1.5} />
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
              Start Free Trial
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              Get {process.env.NEXT_PUBLIC_FREE_CERTS} certificates for free.
            </div>
            <FreetrialButton />
          </div>
        )}
      </div>
    </Popup>
  );
};

export default PlanExpired;
