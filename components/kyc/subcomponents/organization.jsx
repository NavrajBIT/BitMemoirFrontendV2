import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { downloadFile } from "@/components/subcomponents/scripts/scripts";

const Organization = ({ usekyc }) => {
  if (usekyc.organizationDetails === null) {
    return <LocalLoading text="Loading organization details..." />;
  }

  const formData = [
    {
      label: "Name of the organization",
      type: "text",
      required: true,
      maxLength: "100",
      value: usekyc.organizationDetails.name,
      setValue: (e) =>
        usekyc.handleChange("organization", "name", e.target.value),
    },
    {
      label: "Address",
      type: "text",
      required: false,
      maxLength: "500",
      value: usekyc.organizationDetails.address,
      setValue: (e) =>
        usekyc.handleChange("organization", "address", e.target.value),
    },
    {
      label: "Country",
      type: "text",
      required: true,
      maxLength: "100",
      value: usekyc.organizationDetails.country,
      setValue: (e) =>
        usekyc.handleChange("organization", "country", e.target.value),
    },
    {
      label: "Website",
      type: "text",
      required: false,
      maxLength: "100",
      value: usekyc.organizationDetails.website,
      setValue: (e) =>
        usekyc.handleChange("organization", "website", e.target.value),
    },
    {
      label: "Description",
      type: "text",
      required: false,
      maxLength: "500",
      value: usekyc.organizationDetails.description,
      setValue: (e) =>
        usekyc.handleChange("organization", "description", e.target.value),
    },
    {
      label: "Registration Id",
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
      text: "Upload Registration Proof",
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
      formTitle="Organization Details"
      formButton={usekyc.organizationChanged ? "Save" : "Next >"}
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleOrganizationSubmit}
      formData={formData}
    >
      {usekyc.organizationChanged && (
        <Button
          text="Skip for now >>"
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
