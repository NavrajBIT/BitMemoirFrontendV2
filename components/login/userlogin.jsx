import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import Google from "./google";
import FacebookOAuth from "./facebook";
import { GoogleOAuthProvider } from "@react-oauth/google";

const UserLogin = ({ useLogin }) => {
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        formTitle={"Log In"}
        formData={useLogin.loginformData}
        handleSubmit={useLogin.loginSubmit}
        formButton={"Log In"}
        status={useLogin.status}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--padding-main)",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_KEY}>
              <Google useLogin={useLogin} />
            </GoogleOAuthProvider>
          </div>
          <FacebookOAuth useLogin={useLogin} />
          <div style={{ display: "flex", alignItems: "center" }}>
            Don&apos;t have an account?
            <div style={{ width: "fit-content" }}>
              <Button
                text={"Sign Up"}
                variant={"tertiary"}
                onClick={() => {
                  useLogin.setStatus("");
                  useLogin.setSignUp(true);
                }}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserLogin;
