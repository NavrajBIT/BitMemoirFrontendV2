import ServerAPI from "../subcomponents/scripts/serversideapicall";

const usecertificate = async (params) => {
  const api = ServerAPI();

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

  const certData = await data();

  return { certDetails: certData.certDetails, txId: certData.txId };
};

export default usecertificate;
