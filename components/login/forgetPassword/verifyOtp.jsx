import DynamicForm from "@/components/subcomponents/form/dynamicForm";

const formData = [
  {
    label: "Enter OTP",
    type: "number",
    required: true,
  },
];

const VerifyOtp = () => {
  const getButtonTitle = () => {
    return "Submit";
  };

  return (
    <DynamicForm
     formTitle="Verify OTP"
      formButton={getButtonTitle()}
      formData={formData}
    />
  );
};

export default VerifyOtp;
