import DynamicForm from "@/components/subcomponents/form/dynamicForm";
const formData = [
  {
    label: "Email",
    type: "email",
    required: true,
    maxLength: "50",
  },
];

const Forget = () => {
  const getButtonTitle = () => {
    return "Send OTP";
  };

  return (
    <DynamicForm
      formTitle="Forget Password"
      formButton={getButtonTitle()}
      formData={formData}
    />
  );
};

export default Forget;
