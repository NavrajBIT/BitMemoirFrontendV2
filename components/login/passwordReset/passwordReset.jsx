"use client";
import { useState } from "react";
import Stepper from "@/components/subcomponents/stepper/stepper";
import Forgot from "./forgot";
// import VerifyOtp from "./forgetPassword/verifyOtp";
// import GenerateNewPassword from "./forgetPassword/generateNewPassword";

const PasswordReset = () => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserdetails] = useState({
    username: "",
    otp: "",
    password: "",
    email: "",
  });

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
        numberOfSteps={3}
        currentStep={step}
        setCurrentStep={(e) => setStep(e)}
      />

      {step === 1 && (
        <Forgot
          userDetails={userDetails}
          setUserdetails={setUserdetails}
          step={step}
          setStep={setStep}
        />
      )}
      {/* {step === 2 && (
        <VerifyOtp
          userDetailsForForget={userDetailsForForget}
          setUserDetailsForForget={setUserDetailsForForget}
          isLoading={isLoading}
          setLoading={setLoading}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <GenerateNewPassword
          userDetailsForForget={userDetailsForForget}
          setUserDetailsForForget={setUserDetailsForForget}
          isLoading={isLoading}
          setLoading={setLoading}
          step={step}
          setStep={setStep}
        />
      )} */}
    </div>
  );
};

export default PasswordReset;
