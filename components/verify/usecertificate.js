import API from "../subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";

const usecertificate = (params) => {
  const api = API();
  const [certDetails, setCertDetails] = useState(null);

  useEffect(() => {
    poppulateCertDetails();
  }, []);

  const poppulateCertDetails = () => {
    api
      .certificate(params.certId)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) setCertDetails(res);
      })
      .catch((err) => console.log(err));
  };
  return { certDetails };
};

export default usecertificate;
