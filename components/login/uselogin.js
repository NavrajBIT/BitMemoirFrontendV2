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
          window.location.reload(true);
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
        console.log(res);
        if (res.error) {
          setStatus(res.error);
        } else {
          router.back();
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Something went wrong. Please try again.");
      });

    setIsLoading(false);
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
  };
};

export default uselogin;
