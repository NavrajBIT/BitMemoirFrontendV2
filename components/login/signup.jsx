import Form from "../subcomponents/form/form";
import Button from "../subcomponents/button/button";

const UserSignUp = ({ useLogin }) => {
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
          Already have an account?
          <div style={{ width: "50%" }}>
            <Button
              text={"Log In"}
              variant={"secondary"}
              onClick={() => {
                useLogin.setStatus("");
                useLogin.setIsLoading(false);
                useLogin.setSignUp(false);
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserSignUp;
