"use client";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function FacebookOAuth({ useLogin }) {
  return (
    <div>
      <LoginSocialFacebook
        appId={process.env.NEXT_PUBLIC_FACEBOOK_KEY}
        onResolve={useLogin.handleFacebookLogin}
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
