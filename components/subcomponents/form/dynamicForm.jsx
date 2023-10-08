"use client";
import style from "./form.module.css";
import { useRef, useState } from "react";
import Button from "../button/button";
import { downloadFile } from "../scripts/scripts";

const DynamicForm = ({
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
        {formData.map((inputData, index) => {
          if (inputData.type === "file") {
            return (
              <FileInput inputData={inputData} key={inputData.label + index} />
            );
          }
          return (
            <InputField inputData={inputData} key={inputData.label + index} />
          );
        })}
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

export default DynamicForm;

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
        value={inputData.value}
        onChange={inputData.setValue}
        maxLength={inputData.maxLength ? inputData.maxLength : ""}
      />
    </div>
  );
};

const FileInput = ({ inputData }) => {
  const inputref = useRef(null);

  const reg_filename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleFileInput = (event) => {
    console.log("handling input");
    let file = event.target.files[0];
    inputData.onChange(file);
  };
  return (
    <div className={style.fileInputContainer}>
      <input
        ref={inputref}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileInput}
      />
      <Button
        text={inputData.text}
        variant={"secondary"}
        endIcon={"upload"}
        onClick={() => inputref.current.click()}
      />
      {inputData.file !== null && (
        <Button
          text={"File: " + reg_filename(inputData.file)}
          variant={"tertiary"}
          onClick={() => {
            downloadFile(inputData.file, reg_filename(inputData.file));
          }}
        />
      )}
    </div>
  );
};
