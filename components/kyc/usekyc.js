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
  const [kycStatus, setKycStatus] = useState(null);

  useEffect(() => {
    poppulateAccountDetails();
    poppulateEmailDetails();
    poppulateOrganizationDetails();
    poppulateIssuerDetails();
    poppulateKYCDetails();
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
  const poppulateKYCDetails = async () => {
    await api
      .crud("GET", "user/kyc")
      .then((res) => {
        console.log(res[0]);
        if (res.status === 200) {
          setKycStatus(res);
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
          if (
            res.status === 400 &&
            res.email[0] === "user email with this email already exists."
          ) {
            setFormStatus(
              "Email address is already taken. Please use a different email address or login with your other account. For further assistance, contact us at support@beimagine.tech"
            );
          }
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

  const uploadRegProof = async (model, field, file) => {
    console.log("uploading file...");
    let endPoint;
    if (model === "organization")
      endPoint = `user/organization/${organizationDetails.id}`;
    if (model === "issuer") endPoint = `user/issuer/${issuerDetails.id}`;

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
  };

  const handleWalletSubmit = async (walletAddress) => {
    setIsLoading(true);

    await api
      .crud("PATCH", `user/account/${accountDetails.id}`, {
        wallet: walletAddress,
      })
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          router.push("/kyc/status");
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
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
    handleWalletSubmit,
    accountChanged,
    emailChanged,
    organizationChanged,
    issuerChanged,
    kycStatus,
  };
};

export default usekyc;
