"use client";
import CertCreator from "@/components/certCreator/certCreator";
import Loading from "@/components/subcomponents/loadingPage/loading";
import API from "@/components/subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";

const TemplateUpdate = ({ params }) => {
  const api = API();
  const [templateId, setTemplateId] = useState(null);

  useEffect(() => {
    getTemplateId();
  }, []);

  const getTemplateId = async () => {
    await api
      .crud("GET", `certificate/order/${params.orderId}`)
      .then((res) => {
        if (res.status === 200) {
          setTemplateId(res.template);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!templateId) return <Loading />;
  return (
    <CertCreator
      params={{
        templateId: templateId,
        dynamic: true,
        orderId: params.orderId,
      }}
    />
  );
};

export default TemplateUpdate;
