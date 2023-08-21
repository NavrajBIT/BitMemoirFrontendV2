"use client";
import style from "./form.module.css";
import { useRef, useState } from "react";
import Button from "../button/button";

const Form = ({
  formTitle,
  formData,
  handleSubmit,
  formButton,
  status,
  isLoading,
  children,
}) => {
  const submitForm = (e) => {
    e.preventDefault();
    let submitResults = {};
    formData.map((element, index) => {
      submitResults[element.label] = e.target[index].value;
    });
    handleSubmit(submitResults);
  };

  return (
    <div className={style.formcontainer}>
      <div className={style.formoverlay} />
      {formTitle && <div className={style.formTitle}>{formTitle}</div>}
      <form onSubmit={submitForm} className={style.myform}>
        {formData.map((inputData, index) => (
          <InputField inputData={inputData} key={inputData.label + index} />
        ))}
        <div style={{ color: "red" }}>{status}</div>
        <div
          style={{
            width: "50%",
            margin: "auto",
          }}
        >
          <Button
            text={formButton}
            type="submit"
            variant="primary"
            isLoading={isLoading}
          />
        </div>
      </form>
      {children}
    </div>
  );
};

export default Form;

const InputField = ({ inputData }) => {
  const inputref = useRef(null);
  const labelref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const label = `${inputData.label} ${inputData.required ? "*" : ""}`;

  return (
    <div className={style.inputcontainer}>
      {isFocus && <label ref={labelref}>{label}</label>}
      <input
        ref={inputref}
        type={inputData.type}
        name={inputData.label}
        placeholder={!isFocus ? label : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={inputData.required}
        maxLength={inputData.maxLength ? inputData.maxLength : ""}
      />
    </div>
  );
};

export const LocalInputField = ({
  inputData,
  value,
  handleChange,
  onFocus,
  onBlur,
}) => {
  const inputref = useRef(null);
  const labelref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocus(false);
    if (onBlur) {
      onBlur();
    }
  };

  const label = `${inputData.label} ${inputData.required ? "*" : ""}`;

  return (
    <div className={style.inputcontainer}>
      {isFocus && <label ref={labelref}>{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        ref={inputref}
        type={inputData.type}
        name={inputData.label}
        placeholder={!isFocus ? label : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={inputData.required}
      />
    </div>
  );
};
