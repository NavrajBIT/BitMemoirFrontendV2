import Button from "@/components/subcomponents/button/button";
import { LocalInputField } from "@/components/subcomponents/form/form";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";

const MobileWallet = ({ useWallet, ln }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [socketURL, setSocketURL] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    poppulateURL();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const poppulateURL = () => {
    const randomInteger = Math.floor(1000000000 + Math.random() * 9000000000);
    setChannelId(randomInteger);
    const wsEndpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT;
    const wsURL = wsEndpoint + randomInteger + "/";
    setSocketURL(
      `wc:${JSON.stringify({
        domain: process.env.NEXT_PUBLIC_LOCATION,
        socket: wsURL,
      })}`
    );
    connectSocket(wsURL);
  };

  const connectSocket = async (wsURL) => {
    const chatSocket = new WebSocket(wsURL);
    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data.message.message);
      if (data.message.message === "accept") {
        useWallet.handleMobileConnect(data.message.accountId);
      } else if (data.message.message === "reject") {
        alert("Wallet connection denied!");
        chatSocket.close();
        poppulateURL();
      }
    };
    chatSocket.onclose = function (e) {
      setIsConnected(false);
      console.log("Chat socket closed unexpectedly");
    };
    chatSocket.onopen = function (e) {
      setSocket(chatSocket);
      setIsConnected(true);
    };
  };

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
        width: "100%",
        maxWidth: "var(--max-width-form)",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {ln === "es" ? "Billetera desde tu móvil" : "Mobile Wallet"}
      </div>
      <div>
        {ln === "es"
          ? "Conecta tu billetera con la app móvil de BitWallet"
          : "Connect with Bit-Wallet mobile app."}
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--padding-light)",
          alignItems: "center",
        }}
      >
        <LocalInputField
          inputData={{
            label: ln === "es" ? "ID de cuenta" : "Account ID",
            required: true,
          }}
          value={walletAddress}
          handleChange={(e) => setWalletAddress(e.target.value)}
        />
        <div style={{ width: "fit-content" }}>
          <Button
            text={ln === "es" ? "Solicitar" : "Request"}
            variant={"primary"}
            isLoading={useWallet.isRequesting}
            onClick={() =>
              useWallet.requestMobileConnection(walletAddress, channelId)
            }
          />
        </div>
      </div>
      <div>{ln === "es" ? "O" : "OR"}</div>
      <div>
        {ln === "es"
          ? "Escanéa el código QR usando la app de BitWallet"
          : "Scan the QR-code using bit-wallet app."}
      </div>
      {isConnected && (
        <QRCode
          size={256}
          bgColor={"var(--primary-90)"}
          fgColor={"var(--primary-50)"}
          value={socketURL}
          viewBox={`0 0 256 256`}
        />
      )}
    </div>
  );
};

export default MobileWallet;
