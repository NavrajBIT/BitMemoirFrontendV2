import style from "./stepper.module.css";

const stepSize = 30;
const stepSizePx = `${stepSize}px`;
const stepSpacing = 150;
const stepSpacingPx = `${stepSpacing}px`;

const Stepper = ({ numberOfSteps, currentStep, setCurrentStep }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:'1rem 0 4rem'
      }}
    >
      {Array.from({ length: numberOfSteps }, () => 0).map((_, index) => {
        if (index === numberOfSteps - 1) {
          return (
            <LastStep
              index={index}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              key={"stepper-" + index}
            />
          );
        }
        return (
          <Step
            index={index}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            key={"stepper-" + index}
          />
        );
      })}
    </div>
  );
};

export default Stepper;

const Step = ({ index, currentStep, setCurrentStep }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <div
      className={style.step}
      onClick={() => 
        setCurrentStep(index + 1)
        // console.log(index)
      }
      style={{
        width: stepSizePx,
        height: stepSizePx,
        borderRadius: stepSizePx,
        background:
          index === currentStep - 1 ? "var(--primary-50)" : "transparent",
      }}
    />
    <div
      className={style.stepSpace}
      style={{
        height: stepSizePx,
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${stepSize / 2}px`,
          borderBottom: "2px solid var(--primary-50)",
        }}
      />
      <div
        style={{
          width: "100%",
          height: `${stepSize / 2}px`,
        }}
      />
    </div>
  </div>
);
const LastStep = ({ index, currentStep, setCurrentStep }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <div
      className={style.step}
      onClick={() => 
        setCurrentStep(index + 1)
        // console.log(index)
      }
      style={{
        width: stepSizePx,
        height: stepSizePx,
        borderRadius: stepSizePx,
        background:
          index === currentStep - 1 ? "var(--primary-50)" : "transparent",
        animationName: index === currentStep - 1 ? style.emphasize : "none",
        animationDuration: "1s",
      }}
    />
  </div>
);
