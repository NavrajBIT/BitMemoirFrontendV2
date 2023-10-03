"use client";
import style from "./form.module.css";
import { useRef, useState } from "react";
import Button from "../button/button";

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
              <ImageField inputData={inputData} key={inputData.label + index} />
            );
          }else if (inputData.type === "select") {
            return (
              <SelectField inputData={inputData} key={inputData.label + index} />
            );
          }else {
            return (
             <InputField inputData={inputData} key={inputData.label + index} />
            );
          }
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



// (Code not Refactored)
const ImageField = ({ inputData }) => {
  const inputref = useRef(null);
  const labelref = useRef(null);

 

  return(
  <div 
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "var(--padding-light)",
      borderRadius: "var(--border-radius)",
      width: "100%",
      color: "var(--text-bright)",
      border: "1px solid var(--primary-50)",
      borderStyle: "dashed",
      textAlign: "center",
      cursor: "pointer",
      overflow: "hidden",
      height: "20rem",
    }}
  >
					<label
						htmlFor="img"
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
						id="uploadCertLabel">
						Click to upload certificate
						<input
              ref={inputref}
							type="file"
							id="img"
							name="img"
							accept="image/*"
							style={{ display: "none" }}
              value={inputData.value}
							onChange={inputData.setValue}
						/>
					</label>
					{/* <div style={{ margin: "8px 0" }} className="drag">
						OR
					</div>
					<div className="drag">Drag and drop image to upload</div> */}
	</div>)
};




//Only for Souvenirs Page (Code not Refactored)
const SelectField = ({ inputData }) => {
  return (
    <div style={{
      width: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

    <select
      id="selectFrame"
      name={inputData.label}
      label={inputData.label}
      value={inputData.value}
      onChange={inputData.setValue}
      placeholder="Select an option"
      style={{
        width: "100%",
        height: "3rem",
        borderRadius: "var(--border-radius)",
        border: "1px solid var(--primary-50)",
        padding: "var(--padding-light)",
        color: "var(--text-bright)",
      }}
    >
      {/* <option value="">Select Frame</option> */}
      {inputData.options && inputData.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
        
      ))}
      {/* <option value="addFrame">Add Frame</option> */}
    </select>
    </div>
  );
};