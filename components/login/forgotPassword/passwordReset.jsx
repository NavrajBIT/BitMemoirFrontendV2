"use client";
import { useState } from "react";
import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";

const PasswordReset = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const api = API();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formData = [
    {
      label:
        ln === "en"
          ? "Username or Email"
          : ln === "es"
          ? "Nombre de usuario o correo electrónico"
          : "اسم المستخدم أو البريد الالكتروني",
      type: "text",
      required: true,
      maxLength: "50",
      value: username,
      setValue: (e) => setUsername(e.target.value),
    },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await api
      .localCrud("POST", "user/forgotPassword", { username: username })
      .then((res) => {
        if (res.message === "Invalid credentials.")
          if (ln === "en") setStatus("Invalid username or email.");
          else if (ln === "es")
            setStatus("Nombre de usuario o correo electrónico no válido.");
          else if (ln === "ar")
            setStatus("اسم مستخدم أو بريد إلكتروني غير صالح.");
          else {
            alert(res.message);
            router.push(`/${ln}/login/changePassword`);
          }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
        justifyContent: "center",
      }}
    >
      <DynamicForm
        formTitle={
          ln === "en"
            ? "Forgot Password"
            : ln === "es"
            ? "Has olvidado tu contraseña"
            : "هل نسيت كلمة السر"
        }
        formButton={
          ln === "en"
            ? "Reset Account"
            : ln === "es"
            ? "Restablecer cuenta"
            : "إعادة ضبط الحساب"
        }
        formData={formData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
      >
        <div>
          {ln === "en" &&
            "Your new credentials will be sent to your registered email address."}
          {ln === "es" &&
            "Sus nuevas credenciales se enviarán a su dirección de correo electrónico registrada."}
          {ln === "ar" &&
            "سيتم إرسال بيانات الاعتماد الجديدة الخاصة بك إلى عنوان بريدك الإلكتروني المسجل."}
        </div>
        <div>
          {ln === "en" &&
            "For further assistance, please write to support@beimagine.tech"}
          {ln === "es" &&
            "Para obtener más ayuda, escriba a support@beimagine.tech"}
          {ln === "ar" &&
            "لمزيد من المساعدة، يرجى الكتابة إلى support@beimagine.tech"}
        </div>
      </DynamicForm>
    </div>
  );
};

export default PasswordReset;
