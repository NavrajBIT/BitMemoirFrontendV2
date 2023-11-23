import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../subcomponents/scripts/apiCall";

const uselogin = (ln) => {
  const api = API();
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formTranslation = {
    Username: { en: "Username", es: "Nombre de usuario", ar: "اسم المستخدم" },
    Password: { en: "Password", es: "Contraseña", ar: "كلمة المرور" },
    "Confirm Password": {
      en: "Confirm Password",
      es: "Confirmar Contraseña",
      ar: "تأكيد كلمة المرور",
    },
  };

  const signupformData = [
    {
      type: "text",
      label: formTranslation["Username"][ln],
      required: true,
    },
    {
      type: "password",
      label: formTranslation["Password"][ln],
      required: true,
    },
    {
      type: "password",
      label: formTranslation["Confirm Password"][ln],
      required: true,
    },
  ];

  const loginformData = [
    {
      type: "text",
      label: formTranslation["Username"][ln],
      required: true,
    },

    {
      type: "password",
      label: formTranslation["Password"][ln],
      required: true,
    },
  ];

  const loginSubmit = async (data) => {
    setStatus("");
    setIsLoading(true);
    await api
      .getToken({
        username: data[formTranslation["Username"][ln]],
        password: data[formTranslation["Password"][ln]],
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
        if (ln === "en") setStatus("Something went wrong. Please try again.");
        else if (ln === "es") setStatus("Algo salió mal. Inténtalo de nuevo.");
        else if (ln === "ar") setStatus("هناك خطأ ما. حاول مرة اخرى.");
      });
    setIsLoading(false);
  };

  const signupSubmit = async (data) => {
    setStatus("");
    setIsLoading(true);
    if (
      data[formTranslation["Password"][ln]] !==
      data[formTranslation["Confirm Password"][ln]]
    ) {
      if (ln === "en") setStatus("Error: Passwords don't match.");
      else if (ln === "es") setStatus("Error: Las contraseñas no coinciden.");
      else if (ln === "ar") setStatus("خطأ: كلمات المرور غير متطابقة.");
      setIsLoading(false);
      return;
    }
    await api
      .createUser({
        username: data[formTranslation["Username"][ln]],
        password: data[formTranslation["Password"][ln]],
      })
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else {
          try {
            let nextRoute = localStorage.getItem("nextRoute");
            router.push(nextRoute);
          } catch {
            router.push(`/${ln}/kyc`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Something went wrong. Please try again.");
      });

    setIsLoading(false);
  };

  //Handle Social Login Oauth  in Button

  const handleGoogleLoginButton = async () => {
    try {
      localStorage.setItem("ln", ln);
    } catch {}
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_KEY;
      const redirectUri = `${process.env.NEXT_PUBLIC_LOCATION}en/login/auth/google`;
      const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20email%20profile`;

      router.push(url);
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  const handleFacebookLoginButton = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_FACEBOOK_KEY;
      const redirectUri = `${process.env.NEXT_PUBLIC_LOCATION}${ln}/login/auth/facebook`;
      const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20public_profile`;
      router.push(authUrl);
    } catch (error) {
      console.error("Error initiating Facebook login:", error);
    }
  };

  //Handle Social Login Oauth  Response from Our backend

  const handleGoogleLogin = (response, page) => {
    const ln1 = "en";
    try {
      let storedLanguage = localStorage.getItem("ln");
      if (storedLanguage !== null && storedLanguage !== "null") {
        ln1 = storedLanguage;
      }
    } catch {}
    setIsLoading(true);
    console.log(response);
    api
      .socialLogin(response, "google-oauth2")
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else {
          if (res.isAccountExits) {
            router.push(`/${ln1}/dashboard`);
          } else {
            try {
              router.push(`/${ln1}/kyc`);
            } catch {
              router.push(`/${ln1}/kyc`);
            }
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFacebookLogin = (response, page) => {
    api
      .socialLogin(response, "facebook")
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else {
          if (res.isAccountExits) {
            router.push(`/${ln}/dashboard`);
          } else {
            try {
              router.push(`/${ln}/kyc`);
            } catch {
              router.push(`/${ln}/kyc`);
            }
          }
        }
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
    handleGoogleLoginButton,
    handleFacebookLoginButton,
  };
};

export default uselogin;
