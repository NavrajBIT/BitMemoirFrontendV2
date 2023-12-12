import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import Form from "@/components/subcomponents/form/form";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { buttonTranslation } from "../translation";

const Account = ({ usekyc, ln }) => {
  if (usekyc.accountDetails === null || usekyc.emailDetails === null) {
    return <LocalLoading text="Loading account details..." />;
  }

  if (usekyc.isOTP) return <OTPForm usekyc={usekyc} ln={ln} />;

  const formData = [
    {
      label: ln === "es" ? "Nombre" : "First name",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.accountDetails.first_name,
      setValue: (e) =>
        usekyc.handleChange("account", "first_name", e.target.value),
    },
    {
      label: ln === "es" ? "Apellido" : "Last name",
      type: "text",
      required: true,
      maxLength: "50",
      value: usekyc.accountDetails.last_name,
      setValue: (e) =>
        usekyc.handleChange("account", "last_name", e.target.value),
    },
    {
      label: "E-mail",
      type: "email",
      required: true,
      value: usekyc.emailDetails.email,
      setValue: (e) => usekyc.handleChange("email", "email", e.target.value),
    },
    {
      label: ln === "es" ? "Número de teléfono" : "Phone",
      type: "tel",
      required: false,
      value: usekyc.accountDetails.phone,
      setValue: (e) => usekyc.handleChange("account", "phone", e.target.value),
    },
  ];

  const getButtonTitle = () => {
    if (usekyc.emailChanged) {
      if (usekyc.accountChanged) return buttonTranslation["Save"][ln];
      else return buttonTranslation["Save Email"][ln];
    } else if (usekyc.accountChanged) return buttonTranslation["Save"][ln];
    else return buttonTranslation["Next >"][ln];
  };

  return (
    <DynamicForm
      formTitle={ln === "es" ? "Detalles de la cuenta" : "Account Details"}
      formButton={getButtonTitle()}
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.handleAccountSubmit}
      formData={formData}
    >
      <br />
      {usekyc.accountChanged || usekyc.emailChanged ? (
        <Button
          text={buttonTranslation["Skip for now >>"][ln]}
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

const OTPForm = ({ usekyc, ln }) => {
  const formData = [
    {
      label: "OTP",
      type: "number",
      required: true,
    },
  ];
  return (
    <Form
      formTitle={ln === "es" ? "Verificar E-mail" : "Verify Email"}
      formButton={ln === "es" ? "Verificar" : "Verify"}
      isLoading={usekyc.isLoading}
      status={usekyc.formStatus}
      handleSubmit={usekyc.verifyEmail}
      formData={formData}
    >
      <div>
        {ln === "es"
          ? `OTP enviada a ${usekyc.emailDetails.email} Revise su correo, incluida la carpeta de spam`
          : `OTP sent to ${usekyc.emailDetails.email}. Please check your mail, including the spam folder.`}
      </div>
    </Form>
  );
};
