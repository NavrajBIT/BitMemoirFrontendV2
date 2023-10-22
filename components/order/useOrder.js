import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";
import { getTime } from "../subcomponents/scripts/scripts";

const useOrder = (params) => {
  const api = API();
  const [orderDetails, setOrderDetails] = useState(null);
  const [templateDetails, setTemplateDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const poppulateOrderDetails = async () => {
    api
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
  };
  const poppulateTemplateDetails = async (templateId) => {
    api
      .crud("GET", `certificate/template/${templateId}`)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setTemplateDetails(res);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    poppulateOrderDetails();
  }, []);

  return { orderDetails, templateDetails, notFound, poppulateOrderDetails };
};

export default useOrder;
