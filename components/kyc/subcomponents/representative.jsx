import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";

const Representative = ({ usekyc }) => {
  if (usekyc.issuerDetails === null) {
    return <LocalLoading text="Loading organization details..." />;
  }

  const formData = [
    {
      label: "Designation of the Representative",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.issuerDetails.designation,
      setValue: (e) =>
        usekyc.handleChange("issuer", "designation", e.target.value),
    },
  ];

  const reg_filename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <DynamicForm
      formTitle="Representative Details"
      formButton={usekyc.issuerChanged ? "Save" : "Next >"}
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleIssuerSubmit}
      formData={formData}
    >
      {usekyc.issuerDetails.signed_note !== null && (
        <Button
          text={"File: " + reg_filename(usekyc.organizationDetails.reg_proof)}
          variant={"tertiary"}
          onClick={() => {
            downloadFile(
              usekyc.organizationDetails.reg_proof,
              reg_filename(usekyc.organizationDetails.reg_proof)
            );
          }}
        />
      )}
      {!usekyc.isLoading && (
        <Button
          text="Upload Signed Note from Authority"
          variant={"secondary"}
          onClick={() => usekyc.uploadRegProof("issuer", "signed_note")}
        />
      )}

      <Button
        text="Download sample note"
        variant={"tertiary"}
        onClick={() => {
          downloadFile(
            "C:/Users/Navra/Downloads/sampleNote.docx",
            reg_filename(usekyc.organizationDetails.reg_proof)
          );
        }}
      />
      <br />
      <Button
        text="Skip for now >>"
        variant={"tertiary"}
        onClick={() => {
          usekyc.changeStep(usekyc.kycStep + 1);
        }}
      />
    </DynamicForm>
  );
};

export default Representative;
