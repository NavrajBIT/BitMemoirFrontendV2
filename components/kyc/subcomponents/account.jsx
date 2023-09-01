import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Form from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";

const Account = ({ usekyc }) => {
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

  const getButtonTitle = () => {
    if (usekyc.emailChanged) {
      if (usekyc.accountChanged) return "Save";
      else return "Save Email";
    } else if (usekyc.accountChanged) return "Save";
    else return "Next >";
  };

  return (
    <DynamicForm
      formTitle="Account Details"
      formButton={getButtonTitle()}
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleAccountSubmit}
      formData={formData}
    >
      <br />
      {usekyc.accountChanged || usekyc.emailChanged ? (
        <Button
          text="Skip for now >>"
          variant={"tertiary"}
          onClick={() => {
            usekyc.changeStep(usekyc.kycStep + 1);
          }}
        />
      ) : (
        ""
      )}
    </DynamicForm>
  );
};

export default Account;

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
