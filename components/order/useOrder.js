import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";

const useOrder = (params) => {
  const api = API();
  const [orderDetails, setOrderDetails] = useState(null);
  const [templateDetails, setTemplateDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const datetimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const poppulateOrderDetails = async () => {
    api
      .crud("GET", `certificate/order/${params.orderId}`)
      .then((res) => {
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          const date = new Date(res.timestamp);
          const time = date.toLocaleString("en-US", datetimeOptions);
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

  return { orderDetails, templateDetails, notFound };
};

export default useOrder;
