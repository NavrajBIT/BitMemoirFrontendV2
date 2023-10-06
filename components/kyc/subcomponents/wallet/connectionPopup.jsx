import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";

const ConnectionPopup = ({ useWallet }) => {
  return (
    <Popup>
      <div
        style={{
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          background: "var(--primary-90)",
          gap: "var(--padding-main)",
          maxWidth: "var(--max-width-form)",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Connect Wallet ?
        </div>
        <div style={{ overflowWrap: "break-word" }}>
          Wallet address : {useWallet.walletAddress}
        </div>
        <div style={{ color: "var(--error)" }}>
          Note: This action can not be reversed.
        </div>
        <div style={{ display: "flex", gap: "var(--padding-light)" }}>
          <Button
            text="Connect"
            variant={"primary"}
            onClick={() => useWallet.submitWalletAddress()}
          />
          <Button
            text="Cancel"
            variant={"secondary"}
            onClick={() => useWallet.setIsPopup(false)}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ConnectionPopup;
