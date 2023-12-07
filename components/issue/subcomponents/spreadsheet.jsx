import style from "../issue.module.css";
import { LocalInputField } from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";

const Spreadsheet = ({ issue, ln }) => {
  const handleCellChange = (rowIndex, columnIndex, newValue) => {
    const newData = [...issue.studentData];
    newData[rowIndex][columnIndex] = newValue;
    issue.setStudentData(newData);
  };

  if (Array.isArray(issue.studentData) && issue.studentData.length > 0) {
    return (
      <form className={style.spreadsheetContainer}>
        <div className={style.rowContainer}>
          <div className={style.sno}>S.No.</div>
          <div className={style.row}>
            {issue.template.variables.map((variable, index) => (
              <div key={variable.name + "-" + index} className={style.cell}>
                {variable.name}
              </div>
            ))}
            <div className={style.cell}>Email</div>
            <div className={style.cell}>NEAR Wallet</div>
          </div>
        </div>

        {issue.studentData.map((row, rowIndex) => (
          <div key={"row-" + rowIndex} className={style.rowContainer}>
            <div className={style.sno}>{rowIndex + 1}</div>
            <div className={style.row}>
              {row.map((cellValue, columnIndex) => (
                <div className={style.cell}>
                  <LocalInputField
                    value={cellValue}
                    inputData={{ type: "text", label: "" }}
                    handleChange={(e) =>
                      handleCellChange(rowIndex, columnIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ width: "fit-content" }}>
          <Button
            text={
              ln === "en"
                ? "Issue Certificates >"
                : ln === "es"
                ? "Emitir Certificados >"
                : "إصدار الشهادات >"
            }
            variant="primary"
            onClick={issue.handleNext}
          />
        </div>
      </form>
    );
  } else return null;
};

export default Spreadsheet;
