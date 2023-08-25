import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";

const uselogin = () => {
  const api = API();
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signupformData = [
    {
      type: "text",
      label: "Username",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      required: true,
    },
    {
      type: "password",
      label: "Confirm Password",
      required: true,
    },
  ];

  const loginformData = [
    {
      type: "text",
      label: "Username",
      required: true,
    },

    {
      type: "password",
      label: "Password",
      required: true,
    },
  ];

  const loginSubmit = async (data) => {
    setStatus("");
    setIsLoading(true);
    await api
      .getToken({
        username: data.Username,
        password: data.Password,
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          setStatus(res.error);
        } else {
          router.back();
        }
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again.");
      });
    setIsLoading(false);
  };

  const signupSubmit = async (data) => {
    setStatus("");
    setIsLoading(true);
    if (data["Password"] !== data["Confirm Password"]) {
      setStatus("Error: Passwords don't match.");
      setIsLoading(false);
      return;
    }
    await api
      .createUser({
        username: data.Username,
        password: data.Password,
      })
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else {
          try {
            let nextRoute = localStorage.getItem("nextRoute");
            router.push(nextRoute);
          } catch {
            router.push("/kyc");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Something went wrong. Please try again.");
      });

    setIsLoading(false);
  };

  const handleGoogleLogin = (response) => {
    api
      .socialLogin(response.access_token, "google-oauth2")
      .then((res) => {
        router.back();
      })
      .catch((err) => console.log(err));
  };
  const handleFacebookLogin = (response) => {
    api
      .socialLogin(response.data.accessToken, "facebook")
      .then((res) => {
        router.back();
      })
      .catch((err) => console.log(err));
  };

  return {
    signUp,
    setSignUp,
    status,
    setStatus,
    signupformData,
    loginformData,
    loginSubmit,
    signupSubmit,
    isLoading,
    setIsLoading,
    handleGoogleLogin,
    handleFacebookLogin,
  };
};

export default uselogin;
