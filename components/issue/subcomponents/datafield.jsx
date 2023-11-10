import { LocalInputField } from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";

const Datafield = ({ issue, ln }) => {
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
        {ln === "en" && "Template"}
        {ln === "es" && "Plantilla"}
        {ln === "ar" && "نموذج"}: {issue.template.name}
      </div>

      <div>
        <Button
          text={
            ln === "en"
              ? "Upload Data File (.csv)"
              : ln === "es"
              ? "Cargar archivo de datos (.csv)"
              : "تحميل ملف البيانات (.csv)"
          }
          variant={"primary"}
          onClick={issue.uploadcsv}
        />
      </div>
      <div>
        <Button
          text={
            ln === "en"
              ? "Download Data File Format (.csv)"
              : ln === "es"
              ? "Descargar formato de archivo de datos (.csv)"
              : "تنزيل تنسيق ملف البيانات (.csv)"
          }
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
          {ln === "en" && "No. of recipients"}
          {ln === "es" && "No. de destinatarios"}
          {ln === "ar" && "عدد المستلمين"}:
        </div>
        <LocalInputField
          inputData={{
            label:
              ln === "en"
                ? "No. of recipients"
                : ln === "es"
                ? "No. de destinatarios"
                : "عدد المستلمين",
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
