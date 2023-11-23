"use client";
import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import SocialLoginPage from "./subcomponents/socialloginButton";

const UserSignUp = ({ useLogin, ln }) => {
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        formTitle={
          ln === "en" ? "Sign Up" : ln === "es" ? "Regístrate" : "اشتراك"
        }
        formData={useLogin.signupformData}
        formButton={
          ln === "en" ? "Sign Up" : ln === "es" ? "Regístrate" : "اشتراك"
        }
        handleSubmit={useLogin.signupSubmit}
        status={useLogin.status}
        isLoading={useLogin.isLoading}
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
          <SocialLoginPage ln={ ln} />

          <div style={{ display: "flex", alignItems: "center" }}>
            {ln === "en" && "Already have an account?"}
            {ln === "es" && "¿Ya tienes una cuenta?"}
            {ln === "ar" && "هل لديك حساب؟"}
            <div style={{ width: "fit-content" }}>
              <Button
                text={
                  ln === "en"
                    ? "Log In"
                    : ln === "es"
                    ? "Acceso"
                    : "تسجيل الدخول"
                }
                variant={"tertiary"}
                onClick={() => {
                  useLogin.setStatus("");
                  useLogin.setIsLoading(false);
                  useLogin.setSignUp(false);
                }}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserSignUp;
