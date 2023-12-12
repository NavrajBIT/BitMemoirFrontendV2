import Button from "@/components/subcomponents/button/button";

const BrowserWallet = ({ useWallet, ln }) => {
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
        {ln === "es" ? "Billetera desde tu navegado" : "Browser Wallet"}
      </div>
      <div>
        {ln === "es"
          ? "Conecta tu extensión de Bit-Wallet en tu navegador"
          : "Connect with Bit-Wallet browser extension."}
      </div>
      <div style={{ width: "fit-content" }}>
        <Button
          text={
            useWallet.isWallet
              ? ln === "es"
                ? "Conectar billetera"
                : "Connect Wallet"
              : ln === "es"
              ? "Obtén tu billetera"
              : "Get Wallet"
          }
          variant={"primary"}
          onClick={useWallet.handleBrowserConnect}
        />
      </div>
    </div>
  );
};

export default BrowserWallet;
