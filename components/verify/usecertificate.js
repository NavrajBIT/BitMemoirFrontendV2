import API from "../subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";

const usecertificate = (params) => {
  const api = API();
  const [certDetails, setCertDetails] = useState(null);
  const [txId, setTxId] = useState(null);

  useEffect(() => {
    poppulateCertDetails();
  }, []);

  const poppulateCertDetails = () => {
    api
      .certificate(params.certId)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setCertDetails(res);
          if (res.nft) {
            api.nft(res.nft).then((nftres) => {
              if (nftres.status === 200) setTxId(nftres.tx_id);
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return { certDetails, txId };
};

export default usecertificate;
