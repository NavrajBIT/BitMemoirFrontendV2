"use client";
import Account from "./subcomponents/account";
import Organization from "./subcomponents/organization";
import Representative from "./subcomponents/representative";
import Wallet from "./subcomponents/wallet";
import usekyc from "./usekyc";
import Stepper from "../subcomponents/stepper/stepper";

const Kyc = () => {
  const script = usekyc();
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

      {script.kycStep === 1 && <Account usekyc={script} />}
      {script.kycStep === 2 && <Organization usekyc={script} />}
      {script.kycStep === 3 && <Representative usekyc={script} />}
      {script.kycStep === 4 && <Wallet usekyc={script} />}
    </div>
  );
};

export default Kyc;
