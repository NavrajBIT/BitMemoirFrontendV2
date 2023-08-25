"use client";
import TrialForm from "./trialForm";
import usekyc from "../kyc/usekyc";
import TermsPopup from "./termsPopup";

const Trial = () => {
  const script = usekyc();

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
      <TrialForm usekyc={script} />
      {script.kycStep > 1 && <TermsPopup />}
    </div>
  );
};

export default Trial;
