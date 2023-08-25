"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "react-social-login-buttons";

const Google = ({ useLogin }) => {
  const login = useGoogleLogin({
    onSuccess: useLogin.handleGoogleLogin,
  });
  return <GoogleLoginButton onClick={() => login()} />;
};

export default Google;
