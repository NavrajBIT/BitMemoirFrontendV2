import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";
import { buttonTranslation } from "../translation";

const Organization = ({ usekyc, ln }) => {
  if (usekyc.organizationDetails === null) {
    return <LocalLoading text="Loading organization details..." />;
  }

  const formData = [
    {
      label:
        ln === "es" ? "Nombre de la organización" : "Name of the organization",
      type: "text",
      required: true,
      maxLength: "100",
      value: usekyc.organizationDetails.name,
      setValue: (e) =>
        usekyc.handleChange("organization", "name", e.target.value),
    },
    {
      label: ln === "es" ? "Dirección" : "Address",
      type: "text",
      required: false,
      maxLength: "500",
      value: usekyc.organizationDetails.address,
      setValue: (e) =>
        usekyc.handleChange("organization", "address", e.target.value),
    },
    {
      label: ln === "es" ? "País" : "Country",
      type: "text",
      required: true,
      maxLength: "100",
      value: usekyc.organizationDetails.country,
      setValue: (e) =>
        usekyc.handleChange("organization", "country", e.target.value),
    },
    {
      label: ln === "es" ? "Sitio web" : "Website",
      type: "text",
      required: false,
      maxLength: "100",
      value: usekyc.organizationDetails.website,
      setValue: (e) =>
        usekyc.handleChange("organization", "website", e.target.value),
    },
    {
      label: ln === "es" ? "Descripción de la organización" : "Description",
      type: "text",
      required: false,
      maxLength: "500",
      value: usekyc.organizationDetails.description,
      setValue: (e) =>
        usekyc.handleChange("organization", "description", e.target.value),
    },
    {
      label: ln === "es" ? "ID de registro" : "Registration Id",
      type: "text",
      required: false,
      maxLength: "50",
      value: usekyc.organizationDetails.reg_id,
      setValue: (e) =>
        usekyc.handleChange("organization", "reg_id", e.target.value),
    },
    {
      type: "file",
      required: true,
      file: usekyc.issuerDetails.signed_note,
      text:
        ln === "es" ? "Cargar prueba de registro" : "Upload Registration Proof",
      onChange: (file) =>
        usekyc.uploadRegProof("organization", "reg_proof", file),
    },
  ];

  const reg_filename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <DynamicForm
      formTitle={
        ln === "es" ? "Detalles de la organización" : "Organization Details"
      }
      formButton={
        usekyc.organizationChanged
          ? buttonTranslation["Save"][ln]
          : buttonTranslation["Next >"][ln]
      }
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleOrganizationSubmit}
      formData={formData}
    >
      {usekyc.organizationChanged && (
        <Button
          text={buttonTranslation["Skip for now >>"][ln]}
          variant={"tertiary"}
          onClick={() => {
            usekyc.changeStep(usekyc.kycStep + 1);
          }}
        />
      )}
    </DynamicForm>
  );
};

export default Organization;
