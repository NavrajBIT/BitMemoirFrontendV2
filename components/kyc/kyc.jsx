"use client";
import Account from "./subcomponents/account";
import Organization from "./subcomponents/organization";
import Representative from "./subcomponents/representative";
import Wallet from "./subcomponents/wallet/wallet";
import usekyc from "./usekyc";
import Stepper from "../subcomponents/stepper/stepper";

const Kyc = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const script = usekyc(ln);
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
        justifyContent: "flex-start",
      }}
    >
      <Stepper
        numberOfSteps={4}
        currentStep={script.kycStep}
        setCurrentStep={script.changeStep}
      />
      <div style={{ height: "2rem" }} />

      {script.kycStep === 1 && <Account usekyc={script} ln={ln} />}
      {script.kycStep === 2 && <Organization usekyc={script} ln={ln} />}
      {script.kycStep === 3 && <Representative usekyc={script} ln={ln} />}
      {script.kycStep === 4 && <Wallet usekyc={script} ln={ln} />}
    </div>
  );
};

export default Kyc;
