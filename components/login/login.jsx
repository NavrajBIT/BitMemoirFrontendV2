"use client";
import UserLogin from "./userlogin";
import UserSignUp from "./signup";
import uselogin from "./uselogin";

const Login = () => {
  const loginscript = uselogin();

  if (loginscript.signUp) {
    return <UserSignUp useLogin={loginscript} />;
  } else {
    return <UserLogin useLogin={loginscript} />;
  }
};

export default Login;
