import variableList from "../variableList";
import Button from "@/components/subcomponents/button/button";
import { useState } from "react";
import { LocalInputField } from "@/components/subcomponents/form/form";
import t from "../translation";

const VariableSelector = ({ close, selectvariable, ln }) => {
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width-form)",
        background: "var(--primary-90)",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-main)",
        color: "var(--text-primary)",
        maxHeight: "80vh",
        overflow: "auto",
        position: "relative",
      }}
    >
      {isCustom ? (
        <CustomVariableSelector
          setIsCustom={setIsCustom}
          close={close}
          selectvariable={selectvariable}
        />
      ) : (
        <>
          <Button
            text={t["Close"][ln] + "X"}
            variant={"primary"}
            onClick={close}
            style={{ background: "var(--error)" }}
          />
          <div
            style={{
              fontSize: "2rem",
              margin: "var(--padding-light) 0px",
              textAlign: "center",
            }}
          >
            {t["Select Variable"][ln]}:
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--padding-light)",
            }}
          >
            {variableList[ln].map((variable, index) => (
              <Button
                text={variable}
                variant={"secondary"}
                key={variable + "-" + index}
                onClick={() => {
                  selectvariable(variable);
                  close();
                }}
              />
            ))}
            <Button
              text={t["Custom Variable"][ln]}
              variant={"primary"}
              onClick={() => {
                setIsCustom(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VariableSelector;

const CustomVariableSelector = ({ setIsCustom, close, selectvariable }) => {
  const [customValue, setCustomValue] = useState("");
  const handleChange = (e) => {
    setCustomValue(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        paddingTop: "var(--padding-main)",
      }}
    >
      <LocalInputField
        inputData={{
          label: "Variable name",
          type: "text",
        }}
        value={customValue}
        handleChange={handleChange}
      />
      <Button
        text={"Add +"}
        variant={"primary"}
        onClick={() => {
          if (customValue !== "") {
            selectvariable(customValue);
            close();
          }
        }}
      />
      <Button
        text={"Cancel X"}
        variant={"secondary"}
        onClick={() => setIsCustom(false)}
      />
    </div>
  );
};
