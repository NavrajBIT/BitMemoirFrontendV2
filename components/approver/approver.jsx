"use client";
import useApprover from "./useApprover";
import Loading from "../subcomponents/loadingPage/loading";
import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import { useRouter } from "next/navigation";
import ApproverList from "./approverList";
import t from "./translation";

const Approver = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const script = useApprover(ln);
  const router = useRouter();

  if (script.isLoading)
    return (
      <div style={{ minHeight: "var(--min-height)" }}>
        <Loading text="loading..." />
      </div>
    );

  const formData = [
    { label: t[ln]["Name"], type: "text", maxLength: "50", required: true },
    {
      label: t[ln]["Designation"],
      type: "text",
      maxLength: "100",
      required: true,
    },
    { label: t[ln]["Email"], type: "email", required: true },
  ];
  return (
    <div style={{ minHeight: "var(--min-height)" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "auto",
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
        }}
      >
        <div style={{ width: "fit-content" }}>
          <Button
            text={"< " + t[ln]["Back"]}
            variant="tertiary"
            onClick={() => router.back()}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form
            formTitle={t[ln]["Approver"]}
            formData={formData}
            handleSubmit={script.addApprover}
            formButton={t[ln]["Add"] + " +"}
            status=""
            isLoading={script.isLoading}
          ></Form>
        </div>
      </div>
      {script.approversList !== null && script.approversList.length > 0 && (
        <ApproverList script={script} ln={ln} />
      )}
    </div>
  );
};

export default Approver;
