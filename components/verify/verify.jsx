"use client";

import Form from "@/components/subcomponents/form/form";
import { useRouter } from "next/navigation";

const Verify = () => {
  const router = useRouter();
  const verifyDataForm = [
    {
      type: "number",
      label: "Certificate Id",
      required: true,
    },
  ];
  const btnClicked = (e) => {
    let certId = e["Certificate Id"];
    router.push(`certificate/${certId}`);
  };
  return (
    <>
      <div
        style={{
          minHeight: "var(--min-height-screen)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          formTitle={"Verify Certificate"}
          formData={verifyDataForm}
          handleSubmit={btnClicked}
          formButton={"Verify"}
          status={""}
          bgImage={false}
        />
      </div>
    </>
  );
};

export default Verify;
