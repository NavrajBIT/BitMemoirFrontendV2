"use client";
import { useRouter } from "next/navigation";
import DynamicForm from "../subcomponents/form/dynamicForm";
import { useState } from "react";
import Verifyfile from "./verifyfile";
import LocalLoading from "../subcomponents/loadingPage/localloading";

const Verify = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const router = useRouter();
  const [certId, setCertId] = useState(null);
  const [cid, setcid] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const verifyDataForm = [
    {
      type: "number",
      label: "Certificate Id",
      required: false,
      value: certId,
      setValue: (e) => {
        setcid("");
        setCertId(e.target.value);
      },
    },
    {
      type: "text",
      label: "CID",
      required: false,
      value: cid,
      setValue: (e) => {
        setCertId(0);
        setcid(e.target.value);
      },
    },
  ];
  const handleSubmit = () => {
    setStatus("");
    if (certId !== null && certId > 0) {
      router.push(`certificate/${certId}`);
    } else if (cid !== "") router.push(`certificate/cid/${cid}`);
    else setStatus("Please enter Either Certificate Id or CID");
  };
  return (
    <>
      <div
        style={{
          minHeight: "var(--min-height-screen)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DynamicForm
          formTitle={
            ln === "en"
              ? "Verify Certificate"
              : ln === "es"
              ? "Verificar certificado"
              : "التحقق من الشهادة"
          }
          formData={verifyDataForm}
          handleSubmit={handleSubmit}
          formButton={
            ln === "en" ? "Verify" : ln === "es" ? "Verificar" : "يؤكد"
          }
          status={status}
          bgImage={false}
        >
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              color: "var(--primary-50)",
            }}
          >
            {ln === "en" && "OR"}
            {ln === "es" && "O"}
            {ln === "ar" && "أو"}
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {ln === "en" && "Upload file to verify"}
            {ln === "es" && "Subir archivo al verificador"}
            {ln === "ar" && "قم بتحميل الملف للتحقق"}
          </div>
          <Verifyfile
            setIsLoading={setIsLoading}
            setcid={(e) => {
              setCertId(0);
              setcid(e);
            }}
            ln={ln}
          />
        </DynamicForm>
        {isLoading && <LocalLoading />}
      </div>
    </>
  );
};

export default Verify;
