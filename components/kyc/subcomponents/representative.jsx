import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";
import { buttonTranslation } from "../translation";

const Representative = ({ usekyc, ln }) => {
  if (usekyc.issuerDetails === null) {
    return <LocalLoading text="Loading representative details..." />;
  }

  const formData = [
    {
      label:
        ln === "es"
          ? "Designación del representante"
          : "Designation of the Representative",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.issuerDetails.designation,
      setValue: (e) =>
        usekyc.handleChange("issuer", "designation", e.target.value),
    },
    {
      type: "file",
      required: true,
      file: usekyc.issuerDetails.signed_note,
      text: ln === "es" ? "Cargar nota firmada" : "Upload Signed Note",
      onChange: (file) => usekyc.uploadRegProof("issuer", "signed_note", file),
    },
  ];

  const reg_filename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <DynamicForm
      formTitle={
        ln === "es" ? "Detalles del representante" : "Representative Details"
      }
      formButton={
        usekyc.issuerChanged
          ? buttonTranslation["Save"][ln]
          : buttonTranslation["Next >"][ln]
      }
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleIssuerSubmit}
      formData={formData}
    >
      <Button
        text={
          ln === "es" ? "Descargar plantilla de nota" : "Download sample note"
        }
        variant={"tertiary"}
        onClick={() => {
          window.open(
            "https://drive.google.com/drive/folders/1hr9JtyGKuY5X9Mt2DcTKDH1fwNo1BODF?usp=sharing"
          );
        }}
      />
      <br />
      <Button
        text={buttonTranslation["Skip for now >>"][ln]}
        variant={"tertiary"}
        onClick={() => {
          usekyc.changeStep(usekyc.kycStep + 1);
        }}
      />
    </DynamicForm>
  );
};

export default Representative;
