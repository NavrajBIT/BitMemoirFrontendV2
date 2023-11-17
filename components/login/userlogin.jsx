"use client";
import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import SocialLoginPage from "./subcomponents/socialloginButton";
import Link from "next/link";

const UserLogin = ({ useLogin, ln }) => {
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        formTitle={
          ln === "en" ? "Log In" : ln === "es" ? "Acceso" : "تسجيل الدخول"
        }
        formData={useLogin.loginformData}
        handleSubmit={useLogin.loginSubmit}
        formButton={
          ln === "en" ? "Log In" : ln === "es" ? "Acceso" : "تسجيل الدخول"
        }
        status={useLogin.status}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--padding-main)",
          }}
        >
          <SocialLoginPage />
          <div style={{ display: "flex", alignItems: "center" }}>
            {ln === "en" && "Don't have an account?"}
            {ln === "es" && "¿No tienes una cuenta?"}
            {ln === "ar" && "ليس لديك حساب؟"}
            <div style={{ width: "fit-content" }}>
              <Button
                text={
                  ln === "en"
                    ? "Sign Up"
                    : ln === "es"
                    ? "Regístrate"
                    : "اشتراك"
                }
                variant={"tertiary"}
                onClick={() => {
                  useLogin.setStatus("");
                  useLogin.setSignUp(true);
                }}
              />
            </div>
          </div>
          <Link
            href={`/${ln}/login/forgotPassword`}
            style={{
              textDecoration: "underline",
              color: "var(--primary-50)",
              marginTop: "-15px",
            }}
          >
            {ln === "en" && "Forgot password"}
            {ln === "es" && "Has olvidado tu contraseña"}
            {ln === "ar" && "هل نسيت كلمة السر"}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default UserLogin;
