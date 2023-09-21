import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import { useRouter } from "next/navigation";

const usekyc = () => {
  const api = API();
  const router = useRouter();
  const [kycStep, setKycStep] = useState(1);
  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountChanged, setAccountChanged] = useState(false);
  const [emailDetails, setEmailDetails] = useState(null);
  const [emailChanged, setEmailChanged] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [organizationChanged, setOrganizationChanged] = useState(false);
  const [issuerDetails, setIssuerDetails] = useState(null);
  const [issuerChanged, setIssuerChanged] = useState(false);

  useEffect(() => {
    poppulateAccountDetails();
    poppulateEmailDetails();
    poppulateOrganizationDetails();
    poppulateIssuerDetails();
  }, []);

  const poppulateAccountDetails = async () => {
    await api
      .crud("GET", "user/account")
      .then((res) => {
        console.log(res[0]);
        if (res.status === 200) {
          setAccountDetails(res[0]);
          setAccountChanged(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const poppulateEmailDetails = async () => {
    await api
      .crud("GET", "user/email")
      .then((res) => {
        console.log(res[0]);
        if (res.status === 200) {
          setEmailDetails(res[0]);
          setEmailChanged(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const poppulateOrganizationDetails = async () => {
    await api
      .crud("GET", "user/organization")
      .then((res) => {
        console.log(res[0]);
        if (res.status === 200) {
          setOrganizationDetails(res[0]);
          setOrganizationChanged(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const poppulateIssuerDetails = async () => {
    await api
      .crud("GET", "user/issuer")
      .then((res) => {
        console.log(res[0]);
        if (res.status === 200) {
          setIssuerDetails(res[0]);
          setIssuerChanged(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const changeStep = (e) => {
    setFormStatus("");
    setIsLoading(false);
    setIsOTP(false);
    setKycStep(e);
  };

  const handleAccountSubmit = async () => {
    setIsLoading(true);
    if (accountChanged) {
      await api
        .crud("PATCH", `user/account/${accountDetails.id}`, accountDetails)
        .then((res) => {
          console.log(res);
          poppulateAccountDetails();
        })
        .catch((err) => console.log(err));
    }
    if (emailChanged) {
      await api
        .crud("PATCH", `user/email/${emailDetails.id}`, emailDetails)
        .then((res) => {
          console.log(res);
          if (res.status >= 200 && res.status <= 299) {
            setIsOTP(true);
          }
        })
        .catch((err) => console.log(err));
    }
    if (!emailChanged) changeStep(kycStep + 1);
    setIsLoading(false);
  };
  const verifyEmail = async (e) => {
    setIsLoading(true);
    let otp = e.OTP;
    let apiData = { ...emailDetails };
    apiData["otp"] = otp;
    await api
      .crud("PATCH", `user/verify-email/${emailDetails.id}`, apiData)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          changeStep(kycStep + 1);
          poppulateEmailDetails();
        } else if (res.status === 400) {
          setFormStatus("Incorrect OTP.");
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  const handleChange = (model, key, value) => {
    if (model === "account") {
      setAccountChanged(true);
      setAccountDetails((prev) => {
        let newDetails = { ...prev };
        newDetails[key] = value;
        return newDetails;
      });
    }
    if (model === "email") {
      setEmailChanged(true);
      setEmailDetails((prev) => {
        let newDetails = { ...prev };
        newDetails[key] = value;
        return newDetails;
      });
    }
    if (model === "organization") {
      setOrganizationChanged(true);
      setOrganizationDetails((prev) => {
        let newDetails = { ...prev };
        newDetails[key] = value;
        return newDetails;
      });
    }
    if (model === "issuer") {
      setIssuerChanged(true);
      setIssuerDetails((prev) => {
        let newDetails = { ...prev };
        newDetails[key] = value;
        return newDetails;
      });
    }
  };

  const handleOrganizationSubmit = async () => {
    if (!organizationChanged) {
      changeStep(kycStep + 1);
      return;
    }

    setIsLoading(true);
    let apiData = { ...organizationDetails };
    delete apiData.reg_proof;
    await api
      .crud("PATCH", `user/organization/${organizationDetails.id}`, apiData)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          changeStep(kycStep + 1);
          poppulateOrganizationDetails();
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };
  const handleIssuerSubmit = async () => {
    if (!issuerChanged) {
      changeStep(kycStep + 1);
      return;
    }
    setIsLoading(true);
    let apiData = { ...issuerDetails };
    delete apiData.signed_note;
    await api
      .crud("PATCH", `user/issuer/${issuerDetails.id}`, apiData)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          changeStep(kycStep + 1);
          poppulateIssuerDetails();
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  const uploadRegProof = (model, field) => {
    let endPoint;

    if (model === "organization")
      endPoint = `user/organization/${organizationDetails.id}`;
    if (model === "issuer") endPoint = `user/issuer/${issuerDetails.id}`;

    const uploader = document.createElement("input");
    uploader.setAttribute("type", "file");
    uploader.onchange = async (event) => {
      let file = event.target.files[0];
      const fileName = file.name.replace(/\s+/g, "_");
      const newFile = new File([file], fileName, { type: file.type });
      const formdata = new FormData();
      formdata.append(field, newFile);
      setIsLoading(true);
      await api
        .crud("PATCH", endPoint, formdata, true)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      if (model === "organization") await poppulateOrganizationDetails();
      if (model === "issuer") await poppulateIssuerDetails();

      setIsLoading(false);
      uploader.remove();
    };
    uploader.click();
  };


  const connectWalletAndHandleApi = async () => {
    setIsLoading(true);
    try {
      // Check if window and window.bit are defined (client-side check)
      if (typeof window !== "undefined" && window.bit) {
        const provider = window.bit;
        const connection = await provider.connect();
        console.log(connection);

        // Update account details state
        setAccountDetails((prev) => ({
          ...prev,
          wallet: connection,
        }));

        // Make an API request to update the user's wallet information
        const response = await api.crud("PATCH", `user/account/${accountDetails.id}`, {
          wallet: connection,
        });

        if (response.status >= 200 && response.status <= 299) {
          router.push("/kyc/status");
        } else {
          console.error("Failed to update user account:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error while connecting wallet:", error);
    }
    setIsLoading(false);
  };




  // const handleWalletSubmit = async () => {
  //   setIsLoading(true);

  //   await api
  //     .crud("PATCH", `user/account/${accountDetails.id}`, {
  //       wallet: accountDetails.wallet,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status >= 200 && res.status <= 299) {
  //         router.push("/kyc/status");
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   setIsLoading(false);

  // };

  const downloadWallet = () => {
    var targetPageUrl = "https://chrome.google.com/webstore/detail/bitwallet-testnet/ckcpahfdaadkkpcoklfamindgidnjebd"; 
    if (typeof window !== "undefined"){
      window.open(targetPageUrl, "_blank");
    }
  };


  return {
    kycStep,
    setKycStep,
    changeStep,
    formStatus,
    isLoading,
    isOTP,
    accountDetails,
    emailDetails,
    organizationDetails,
    handleChange,
    handleAccountSubmit,
    verifyEmail,
    handleOrganizationSubmit,
    uploadRegProof,
    issuerDetails,
    handleIssuerSubmit,
    // handleWalletSubmit,
    accountChanged,
    emailChanged,
    organizationChanged,
    issuerChanged,
    setAccountDetails,
    connectWalletAndHandleApi,
    downloadWallet
  };
};

export default usekyc;
