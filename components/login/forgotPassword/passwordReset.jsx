"use client";
import { useState } from "react";
import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";

const PasswordReset = () => {
  const api = API();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formData = [
    {
      label: "Username or Email",
      type: "text",
      required: true,
      maxLength: "50",
      value: username,
      setValue: (e) => setUsername(e.target.value),
    },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await api
      .localCrud("POST", "user/forgotPassword", { username: username })
      .then((res) => {
        if (res.message === "Invalid credentials.")
          setStatus("Invalid username or email.");
        else {
          alert(res.message);
          router.push("/login/changePassword");
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
        justifyContent: "center",
      }}
    >
      <DynamicForm
        formTitle="Forgot Password"
        formButton={"Reset Account"}
        formData={formData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
      >
        <div>
          Your new credentials will be sent to your registered email address.
        </div>
        <div>
          For further assistance, please write to support@beimagine.tech
        </div>
      </DynamicForm>
    </div>
  );
};

export default PasswordReset;
