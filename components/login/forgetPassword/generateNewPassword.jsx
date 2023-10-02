import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";


const GenerateNewPassword = ({userDetailsForForget,setUserDetailsForForget,isLoading,setLoading,step,setStep}) => {
  console.log(userDetailsForForget);
  const router = useRouter();
  const formData = [
    {
      label: "Enter password",
      type: "password",
      required: true,
      maxLength: "15",
      value : userDetailsForForget.password,
      setValue: (e) => setUserDetailsForForget({...userDetailsForForget,password:e.target.value})
    },
    {
      label: "Confirm password",
      type: "password",
      required: true,
      maxLength: "15",
    },
  ];

  const api = API();
  const getButtonTitle = () => {
    return "Submit";
  };

  const handlePasswordChange = async() => {
    setLoading(true);
    api.crudForResetPassword(
      "PATCH","user/reset-password",{username:userDetailsForForget.username,password:userDetailsForForget.password,otp:userDetailsForForget.otp}
    ).then((res) => {
      if(res.status >= 200 && res.status <= 299){
        router.push("/login")
      }
      setLoading(false);
    })
  }


  return (
    <DynamicForm
      formTitle="New Password"
      formButton={getButtonTitle()}
      formData={formData}
      handleSubmit={handlePasswordChange}

    />
  );
};

export default GenerateNewPassword;
