import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";


const VerifyOtp = ({userDetailsForForget,setUserDetailsForForget,isLoading,setLoading,step,setStep}) => {
  const api = API();
  const formData = [
    {
      label: "Enter OTP",
      type: "number",
      required: true,
      maxLength: "6",
      value: userDetailsForForget.otp,
      setValue: (e) => setUserDetailsForForget({...userDetailsForForget,otp:e.target.value})
    },
  ];


  const handleVerifyOTP = async () => {
    api.crudForResetPassword(
      "PATCH","user/verify-otp",{username:userDetailsForForget.username,otp:userDetailsForForget.otp}
    ).then((res) => {
      if(res.status >= 200 && res.status <= 299){
        setStep(step+1);
      }
      setLoading(false);

    }).catch((err) => console.log(err)
    )
  }

  const getButtonTitle = () => {
    return "Submit";
  };

  

  return (
    <DynamicForm
     formTitle="Verify OTP"
      formButton={getButtonTitle()}
      formData={formData}
      children={<p>OTP has been sent to your email: {userDetailsForForget.email}</p>}
      isLoading={isLoading}
      handleSubmit={handleVerifyOTP}
    />
  );
};

export default VerifyOtp;
