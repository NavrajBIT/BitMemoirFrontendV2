import { useEffect, useState } from "react";
import ServerAPI from "../subcomponents/scripts/serversideapicall";

const usecertificate = (params) => {
  const api = ServerAPI();
  const [certData, setCertData] = useState({ certDetails: null, txId: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    poppulateCertData();
  }, []);

  const data = async () => {
    let returnData = { certDetails: null, txId: null };
    await api
      .crud("GET", `certificate/${params.certId}`)
      .then(async (res) => {
        returnData.certDetails = res;
        if (res.nft) {
          await api.crud("GET", `nft/${res.nft}`).then((nftres) => {
            returnData.txId = nftres;
          });
        }
      })
      .catch((err) => console.log(err));

    return returnData;
  };

  const poppulateCertData = async () => {
    setIsLoading(true);
    const response = await data();
    setIsLoading(false);
    setCertData(response);
  };

  return { certDetails: certData.certDetails, txId: certData.txId, isLoading };
};

export default usecertificate;
