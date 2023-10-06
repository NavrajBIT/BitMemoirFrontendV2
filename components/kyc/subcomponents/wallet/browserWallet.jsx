import Button from "@/components/subcomponents/button/button";

const BrowserWallet = ({ useWallet }) => {
  return (
    <div
      style={{
        marginTop: "var(--padding-main)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        marginTop: "var(--padding-main)",
        padding: "var(--padding-main)",
        alignItems: "center",
        background: "var(--primary-90)",
        borderRadius: "var(--border-radius)",
        maxWidth: "var(--max-width-form)",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Browser Wallet
      </div>
      <div>Connect with Bit-Wallet browser extension.</div>
      <div style={{ width: "fit-content" }}>
        <Button
          text={useWallet.isWallet ? "Connect Wallet" : "Get Wallet"}
          variant={"primary"}
          onClick={useWallet.handleBrowserConnect}
        />
      </div>
    </div>
  );
};

export default BrowserWallet;
