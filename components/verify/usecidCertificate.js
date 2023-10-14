import ServerAPI from "../subcomponents/scripts/serversideapicall";

const useCIDcertificate = async (params) => {
  const api = ServerAPI();

  const data = async () => {
    let returnData = { certDetails: null, txId: null };
    await api
      .crud("POST", `certificate/cid`, { cid: params.cid })
      .then(async (response) => {
        if (response.certificates.length > 0) {
          const res = response.certificates[0];
          returnData.certDetails = res;
          if (res.nft) {
            await api.crud("GET", `nft/${res.nft}`).then((nftres) => {
              returnData.txId = nftres;
            });
          }
        }
      })
      .catch((err) => console.log(err));

    return returnData;
  };

  const certData = await data();

  return { certDetails: certData.certDetails, txId: certData.txId };
};

export default useCIDcertificate;
