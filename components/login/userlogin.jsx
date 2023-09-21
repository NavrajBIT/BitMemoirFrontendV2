"use client";

import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import SocialLoginPage from "./subcomponents/socialloginButton";
import Link from "next/link";

const UserLogin = ({ useLogin }) => {
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
        formTitle={"Log In"}
        formData={useLogin.loginformData}
        handleSubmit={useLogin.loginSubmit}
        formButton={"Log In"}
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
          <div style={{
            display: 'flex',
          }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              Don&apos;t have an account?
            </span>
            <Button
              text={"Sign Up"}
              variant={"tertiary"}
              onClick={() => {
                useLogin.setStatus("");
                useLogin.setSignUp(true);
              }}
              style={{ width: 'unset' }}
            />
          </div>
          <Link href="/login/forgetpassword" style={{
            textDecoration: "underline",
            color: 'var(--primary-50)',
            marginTop: '-15px'
          }}>
            Forget password
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default UserLogin;
