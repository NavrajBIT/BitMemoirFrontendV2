import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import { useState } from "react";

const Forgot = ({ userDetails, setUserdetails, step, setStep }) => {
  const api = API();
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const formData = [
    {
      label: "Username or Email",
      type: "text",
      required: true,
      maxLength: "50",
      value: userDetails.username,
      setValue: (e) =>
        setUserdetails({
          ...userDetails,
          username: e.target.value,
        }),
    },
  ];

  const sendOTP = async () => {
    setLoading(true);
    api
      .crudForResetPassword(
        "POST",
        "user/send-otp",
        { username: userDetails.username },
        true
      )
      .then((res) => {
        setUserdetails((prevState) => {
          return { ...prevState, email: res.email };
        });
        if (res.status >= 200 && res.status <= 299) {
          setStep(step + 1);
        }
        setLoading(false);
        // console.log(userDetailsForForget);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DynamicForm
      formTitle="Reset Password"
      formButton={"Send OTP"}
      formData={formData}
      handleSubmit={sendOTP}
      isLoading={isLoading}
      status={status}
    />
  );
};

export default Forgot;
