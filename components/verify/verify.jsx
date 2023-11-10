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
          formTitle={"Verify Certificate"}
          formData={verifyDataForm}
          handleSubmit={handleSubmit}
          formButton={"Verify"}
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
            OR
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            Upload file to verify
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
