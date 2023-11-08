import style from "./dataUpdate.module.css";
import { LocalInputField } from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";

const DataInput = ({ certData, setCertData, savedata, isLoading }) => {
  return (
    <div className={style.datainputContainer}>
      <div className={style.inputRow}>
        <div className={style.inputContainerHeading}>Cert Id</div>
        {certData[0].variablevalues?.map((variable, varIndex) => {
          return (
            <div
              key={"variable-name-" + varIndex}
              className={style.inputContainerHeading}
              style={{ textAlign: "center" }}
            >
              {variable.variable_name}
            </div>
          );
        })}
      </div>
      {certData?.map((cert, index) => (
        <div key={"cert-data-" + index} className={style.inputRow}>
          <div className={style.inputContainer}>{cert.id}</div>

          {cert.variablevalues?.map((variable, varIndex) => {
            return (
              <div
                key={"variable-" + index + "-" + varIndex}
                className={style.inputContainer}
              >
                <LocalInputField
                  inputData={{ label: variable.variable_name, type: "text" }}
                  value={variable.value}
                  handleChange={(e) => {
                    setHasChanged(true);
                    setCertData((prev) => {
                      let newcertData = [...prev];
                      newcertData[index]["variablevalues"][varIndex]["value"] =
                        e.target.value;
                      return newcertData;
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DataInput;
