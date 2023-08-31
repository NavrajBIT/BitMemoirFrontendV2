import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Form from "@/components/subcomponents/form/form";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";

const TrialForm = ({ usekyc }) => {
  if (usekyc.accountDetails === null || usekyc.emailDetails === null) {
    return <LocalLoading text="Loading account details..." />;
  }

  if (usekyc.isOTP) return <OTPForm usekyc={usekyc} />;

  const formData = [
    {
      label: "First name",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.accountDetails.first_name,
      setValue: (e) =>
        usekyc.handleChange("account", "first_name", e.target.value),
    },
    {
      label: "Last name",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.accountDetails.last_name,
      setValue: (e) =>
        usekyc.handleChange("account", "last_name", e.target.value),
    },
    {
      label: "Email",
      type: "email",
      required: true,
      value: usekyc.emailDetails.email,
      setValue: (e) => usekyc.handleChange("email", "email", e.target.value),
    },
    {
      label: "Phone",
      type: "tel",
      required: false,
      value: usekyc.accountDetails.phone,
      setValue: (e) => usekyc.handleChange("account", "phone", e.target.value),
    },
  ];

  return (
    <DynamicForm
      formTitle="Free Trial"
      formButton="Save"
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleAccountSubmit}
      formData={formData}
    ></DynamicForm>
  );
};

export default TrialForm;

const OTPForm = ({ usekyc }) => {
  const formData = [
    {
      label: "OTP",
      type: "number",
      required: true,
    },
  ];
  return (
    <Form
      formTitle="Verify Email"
      formButton="Verify"
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.verifyEmail}
      formData={formData}
    >
      <div>
        OTP sent to {usekyc.emailDetails.email}. Please check your mail,
        including the spam folder.
      </div>
    </Form>
  );
};
