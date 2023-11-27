import ServerAPI from "@/components/subcomponents/scripts/serversideapicall";

const update = (certId) => {
  const api = ServerAPI();
  api
    .crud("GET", `certificate/addVerify/?certId=${certId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return null;
};

export default update;
