"use client";
import React from "react";
//Social Login Buttons
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

//Custom Login Scripts
import uselogin from "../uselogin";

const SocialLoginPage = () => {
  const script = uselogin();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button onClick={script.handleGoogleLoginButton}>
        <GoogleLoginButton />
      </button>

      <button onClick={script.handleFacebookLoginButton}>
        <FacebookLoginButton />
      </button>
    </div>
  );
};

export default SocialLoginPage;
