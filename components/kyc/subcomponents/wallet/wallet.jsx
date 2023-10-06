import ConnectionPopup from "./connectionPopup";
import BrowserWallet from "./browserWallet";
import MobileWallet from "./mobileWallet";
import useWallet from "./useWallet";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import LinkButton from "@/components/subcomponents/button/link";

const Wallet = ({ usekyc }) => {
  const script = useWallet(usekyc);
  if (script.isLoading) return <LocalLoading text="Checking Wallet..." />;
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
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          padding: "var(--padding-main)",
          borderRadius: "var(--border-radius)",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center" }}>
          A wallet is your identity on the blockchain.
          <br />
          The certificates will be released from your Account ID.
        </div>
        <div
          style={{
            position: "absolute",
            color: "var(--primary-50)",
            top: "-1rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Wallet
        </div>
        {usekyc.accountDetails?.wallet &&
        usekyc.accountDetails?.wallet !== "" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--padding-main)",
              padding: "var(--padding-main)",
              // background: "var(--primary-90)",
              maxWidth: "var(--max-width-form)",
              margin: "auto",
            }}
          >
            <div style={{ color: "var(--success)", textAlign: "center" }}>
              Wallet Connected
            </div>
            <div
              style={{
                overflowWrap: "break-word",
              }}
            >
              Account ID: {usekyc.accountDetails.wallet}
            </div>
            <div>
              If you want to change your wallet address, please write to
              support@beimagine.tech.
            </div>
            <LinkButton text="Next >" variant="primary" href="/kyc/status" />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <BrowserWallet useWallet={script} />
            <MobileWallet useWallet={script} />
          </div>
        )}
      </div>
      {script.isPopup && <ConnectionPopup useWallet={script} />}
    </div>
  );
};

export default Wallet;
