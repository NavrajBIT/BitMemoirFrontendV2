"use client";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function FacebookOAuth({ useLogin }) {
  return (
    <div>
      <LoginSocialFacebook
        appId="234093165719884"
        onResolve={useLogin.handleGoogleLogin}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}

export default FacebookOAuth;
