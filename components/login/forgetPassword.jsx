"use client"
import { useState } from "react";
import Stepper from "../subcomponents/stepper/stepper";
import Forget from "./forgetPassword/forget";
import VerifyOtp from "./forgetPassword/verifyOtp";
import GenerateNewPassword from "./forgetPassword/generateNewPassword";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);

  const changeStep = (e) => setStep(e);

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
        setCurrentStep={changeStep}
      />

      {step === 1 && <Forget/>}
      {step === 2 && <VerifyOtp/>}
      {step === 3 && <GenerateNewPassword />}
    </div>
  )
}

export default ForgetPassword;