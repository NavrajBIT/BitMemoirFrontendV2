import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import { getTime } from "../subcomponents/scripts/scripts";
import { useRouter } from "next/navigation";

const useOrder = (params) => {
  const ln = params?.ln ? params.ln : "en";
  const api = API();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [templateDetails, setTemplateDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [certificateDetailsPopup, setcertificatedetailsPopup] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isBuyPopup, setisBuyPopup] = useState(false);
  const [nftQuota, setNftQuota] = useState(null);

  const poppulateOrderDetails = async () => {
    setIsLoading(true);
    await api
      .crud("GET", `certificate/order/${params.orderId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          const time = getTime(res.timestamp);
          res.datetime = time;
          setOrderDetails(res);
          poppulateTemplateDetails(res.template);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };
  const poppulateTemplateDetails = async (templateId) => {
    setIsLoading(true);
    await api
      .crud("GET", `certificate/template/${templateId}`)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setTemplateDetails(res);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const poppulateNFTQuota = async () => {
    await api
      .crud("GET", `subscription/nftQuota`)
      .then((res) => {
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          setNftQuota(parseInt(res.nft_quota));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    poppulateOrderDetails();
    poppulateNFTQuota();
  }, []);

  const issueOrder = async () => {
    setIsLoading(true);
    await api
      .crud("POST", "certificate/issue", { orderId: params.orderId })
      .then((res) => {
        if (res.status === 200) {
          setSuccessPopup(true);
          poppulateOrderDetails();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const updatecerts = async () => {
    setIsLoading(true);
    if (orderDetails.certificates.length >= nftQuota) {
      setisBuyPopup(true);
    } else {
      router.push(`${ln}/order/update/template/${params.orderId}`);
    }
    setIsLoading(false);
  };

  return {
    orderDetails,
    templateDetails,
    notFound,
    poppulateOrderDetails,
    certificateDetailsPopup,
    setcertificatedetailsPopup,
    selectedCertId,
    setSelectedCertId,
    isLoading,
    issueOrder,
    successPopup,
    setSuccessPopup,
    isBuyPopup,
    setisBuyPopup,
    updatecerts,
  };
};

export default useOrder;
