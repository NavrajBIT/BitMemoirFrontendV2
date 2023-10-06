"use client";
import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const api = API();
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formData = [
    {
      label: "Old Password",
      type: "password",
      required: true,
      maxLength: "50",
      value: oldPassword,
      setValue: (e) => setOldPassword(e.target.value),
    },
    {
      label: "New Password",
      type: "password",
      required: true,
      maxLength: "50",
      value: newPassword,
      setValue: (e) => setNewPassword(e.target.value),
    },
    {
      label: "Confirm New Password",
      type: "password",
      required: true,
      maxLength: "50",
      value: confirmPassword,
      setValue: (e) => setConfirmPassword(e.target.value),
    },
  ];

  const handleSubmit = async () => {
    setStatus("");
    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    setIsLoading(true);
    await api
      .crud("POST", "user/changePassword", {
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push("/dashboard");
          alert("Password Changed Successfully.");
        }
        if (res["old_password"][[0]] === "Incorrect old password.") {
          setStatus("Incorrect Password. Please try again.");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Invalid credentials.");
      });
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
        justifyContent: "flex-start",
      }}
    >
      <DynamicForm
        formTitle="Change Password"
        formButton={"Submit"}
        formData={formData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
      />
    </div>
  );
};

export default ChangePassword;
