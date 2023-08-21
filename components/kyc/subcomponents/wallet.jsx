import Button from "@/components/subcomponents/button/button";
import Form from "@/components/subcomponents/form/form";

const Wallet = ({ usekyc }) => {
  return (
    <Form
      formTitle="Wallet"
      formButton="Get Wallet"
      isLoading={false}
      status={""}
      handleSubmit={() => console.log("Wallet button")}
      formData={[]}
    ></Form>
  );
};

export default Wallet;
