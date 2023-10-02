"use client";
import React from "react";
//Social Login Buttons
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

//Custom Login Scripts
import uselogin from "../uselogin";

const SocialLoginPage = () => {
  const script = uselogin();

  const buttonStyle = {
    width: "100%",
    height: "unset",
    padding: "var(--padding-light)",
    margin: 0,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
        padding: "0 var(--padding-main)",
        width: "100%",
      }}
    >
      <button
        onClick={script.handleGoogleLoginButton}
        style={{ width: "100%" }}
      >
        <GoogleLoginButton style={buttonStyle} />
      </button>

      <button
        onClick={script.handleFacebookLoginButton}
        style={{ width: "100%" }}
      >
        <FacebookLoginButton style={buttonStyle} />
      </button>
    </div>
  );
};

export default SocialLoginPage;
