import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";
import Google from "./google";
import FacebookOAuth from "./facebook";
import { GoogleOAuthProvider} from '@react-oauth/google';
const UserSignUp = ({ useLogin }) => {
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        formTitle={"Sign Up"}
        formData={useLogin.signupformData}
        formButton="Sign Up"
        handleSubmit={useLogin.signupSubmit}
        status={useLogin.status}
        isLoading={useLogin.isLoading}
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
            Already have an account?
            <div style={{ width: "fit-content" }}>
              <Button
                text={"Log In"}
                variant={"tertiary"}
                onClick={() => {
                  useLogin.setStatus("");
                  useLogin.setIsLoading(false);
                  useLogin.setSignUp(false);
                }}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserSignUp;
