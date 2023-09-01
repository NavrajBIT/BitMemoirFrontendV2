"use client";
import { useEffect } from "react";
import Loading from "../../subcomponents/loadingPage/loading";
import uselogin from "../uselogin";

export const GoogleAuth = () => {
  const script = uselogin();

  useEffect(() => {
    const tokenMatch = window.location.href.match(/access_token=([^&]+)/);

    if (tokenMatch) {
      const accessToken = tokenMatch[1];
      console.log("Access Token:", accessToken);
      script.handleGoogleLogin(accessToken, "login");
    }
  }, []);

  return <Loading />;
};

export const FacebookAuth = () => {
  const script = uselogin();

  useEffect(() => {
    const tokenMatch = window.location.href.match(/access_token=([^&]+)/);

    if (tokenMatch) {
      const accessToken = tokenMatch[1];
      console.log("Access Token:", accessToken);
      script.handleFacebookLogin(accessToken, "login");
    }
  }, []);

  return <Loading />;
};
