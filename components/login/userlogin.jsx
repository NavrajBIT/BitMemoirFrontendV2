import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import Google from "./google";
import FacebookOAuth from "./facebook";
import { GoogleOAuthProvider} from '@react-oauth/google';
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
          <div style={{ width: "70%" }}>
            <GoogleOAuthProvider clientId="804423343303-6umuo0t8g73cbr68m867qvm8q87hjs3d.apps.googleusercontent.com">
              <Google useLogin={useLogin} />
            </GoogleOAuthProvider>
            <FacebookOAuth useLogin={useLogin} />
          </div>
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
