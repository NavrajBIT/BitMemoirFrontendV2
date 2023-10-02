import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";

const Forget = ({userDetailsForForget,setUserDetailsForForget,isLoading,setLoading,step,setStep}) => {
  const api = API();
  const formData = [
    {
      label:"Username",
      type:"text",
      required:true,
      maxLength:"50",
      value:userDetailsForForget.username,
      setValue:(e)=>setUserDetailsForForget({...userDetailsForForget,username:e.target.value})
    }
  ]

  const getButtonTitle = () => {
    return "Send OTP";
  };


  const sendOTP = async() =>{
    setLoading(true);
    console.log(userDetailsForForget.username);
    api.crudForResetPassword(
      "POST","user/send-otp",{username:userDetailsForForget.username},true
    ).then((res) => {
      setUserDetailsForForget(
        (prevState) => {
          return {...prevState,email:res.email}
        }
      )
      if(res.status >= 200 && res.status <= 299){
        setStep(step+1);
      }
      setLoading(false);
      // console.log(userDetailsForForget);
    }).catch((err) => console.log(err));
  }

  

  return (
    <DynamicForm
      formTitle="Forget Password"
      formButton={getButtonTitle()}
      formData={formData}
      handleSubmit={sendOTP}
      isLoading={isLoading}
    />
    
  );
};

export default Forget;
