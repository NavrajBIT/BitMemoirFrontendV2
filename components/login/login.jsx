"use client";
import UserLogin from "./userlogin";
import UserSignUp from "./usersignup";
import uselogin from "./uselogin";

const Login = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const loginscript = uselogin(ln);

  if (loginscript.signUp) {
    return <UserSignUp useLogin={loginscript} ln={ln} />;
  } else {
    return <UserLogin useLogin={loginscript} ln={ln} />;
  }
};

export default Login;
