import DynamicForm from "@/components/subcomponents/form/dynamicForm";

const formData = [
  {
    label: "Enter password",
    type: "email",
    required: true,
    maxLength: "15",
  },
  {
    label: "Confirm password",
    type: "email",
    required: true,
    maxLength: "15",
  },
];

const GenerateNewPassword = () => {
  const getButtonTitle = () => {
    return "Submit";
  };

  return (
    <DynamicForm
      formTitle="New Password"
      formButton={getButtonTitle()}
      formData={formData}
    />
  );
};

export default GenerateNewPassword;
