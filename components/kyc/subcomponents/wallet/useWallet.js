import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/components/subcomponents/scripts/apiCall";

const useWallet = (usekyc) => {
  const router = useRouter();
  const api = API();
  const [isPopup, setIsPopup] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isWallet, setIsWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const checkWallet = () => {
    if (typeof window !== "undefined") {
      if (window.bit !== undefined) {
        setIsWallet(true);
      } else {
        setIsWallet(false);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    window.setTimeout(checkWallet, 1000);
  }, []);

  const submitWalletAddress = async () => {
    setIsLoading(true);
    await usekyc
      .handleWalletSubmit(walletAddress)
      .then((res) => {
        router.push("/kyc/status");
      })
      .catch((err) => {
        console.log(err);
      });
    router.push("/kyc/status");
    setIsLoading(false);
  };

  const handleBrowserConnect = async () => {
    if (isWallet) {
      await window.bit.connect();
      let address = window.bit.accountId;
      if (address && address !== "") {
        setWalletAddress(address);
        setIsPopup(true);
      }
    } else {
      window.open(
        "https://chrome.google.com/webstore/detail/bitwallet/ddphokhghjkekfdoddpeffdpojdofcan"
      );
    }
  };

  const handleMobileConnect = async (address) => {
    setWalletAddress(address);
    setIsPopup(true);
  };

  const requestMobileConnection = async (address, channelId) => {
    setIsRequesting(true);
    await api.crud("POST", "wallet/notify/connection", {
      account_id: address,
      channel_key: channelId,
      domain: process.env.NEXT_PUBLIC_LOCATION,
    });
    setTimeout(() => setIsRequesting(false), 2000);
  };

  return {
    isLoading,
    isPopup,
    setIsPopup,
    walletAddress,
    setWalletAddress,
    isWallet,
    handleBrowserConnect,
    handleMobileConnect,
    submitWalletAddress,
    requestMobileConnection,
    isRequesting,
  };
};

export default useWallet;
