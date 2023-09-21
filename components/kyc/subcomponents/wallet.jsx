import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Wallet = ({ usekyc }) => {
  const router = useRouter();
  const [isWallet, setIsWallet] = useState(false);

  
  const checkWallet = () => {
    if (typeof window !== "undefined"){
      if (window.bit !== undefined) {
        setIsWallet(true);
      } else {
        setIsWallet(false);
      }
    }
  };

  useEffect(() => {
    if (usekyc.kycStep > 4) router.push("/kyc/status");
    checkWallet();
  }, [usekyc.kycStep]);
  
  
 
 


  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--padding-main)",
      }}
    >
      <LocalInputField
        inputData={{
          type: "text",
          label: "Wallet Address",
          required: true,
        }}
        value={usekyc.accountDetails.wallet}
        handleChange={(e) => {
          usekyc.handleChange("account", "wallet", e.target.value);
        }}
        maxLength="100"
      />
      <div style={{ width: "fit-content" }}>
        {
          isWallet ? <Button
          text="Connect Wallet"
          variant="primary"
          startIcon={"near"}
          onClick={usekyc.connectWalletAndHandleApi}
          isLoading={usekyc.isLoading}
        /> :
        <Button
          text="Download Wallet"
          variant="primary"
          startIcon={"near"}
          onClick={usekyc.downloadWallet}
        />
        }
      </div>
    </div>
  );
};

export default Wallet;
