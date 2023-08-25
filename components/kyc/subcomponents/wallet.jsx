import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Wallet = ({ usekyc }) => {
  const router = useRouter();

  useEffect(() => {
    if (usekyc.kycStep > 4) router.push("/kyc/status");
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
        <Button
          text="Connect Wallet"
          variant="primary"
          startIcon={"near"}
          onClick={usekyc.handleWalletSubmit}
          isLoading={usekyc.isLoading}
        />
      </div>
    </div>
  );
};

export default Wallet;
