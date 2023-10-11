import { LocalInputField } from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";

const Datafield = ({ issue }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          textAlign: "center",
        }}
      >
        Template: {issue.template.name}
      </div>

      <div>
        <Button
          text="Upload Data File (.csv)"
          variant={"primary"}
          onClick={issue.uploadcsv}
        />
      </div>
      <div>
        <Button
          text="Download Data File Format (.csv)"
          variant={"tertiary"}
          onClick={issue.downloadcsv}
        />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width-form)",
          display: "flex",
          gap: "var(--padding-light)",
          alignItems: "center",
          marginTop: "var(--padding-light)",
        }}
      >
        <div
          style={{
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            textAlign: "center",
          }}
        >
          No. of recipients:
        </div>
        <LocalInputField
          inputData={{
            label: "No. of students",
            type: "number",
            required: true,
          }}
          value={issue.studentNumber}
          handleChange={(e) => {
            if (e.target.value > 1000) return;
            issue.handleStudentNumberChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Datafield;
