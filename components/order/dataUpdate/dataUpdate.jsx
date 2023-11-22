"use client";
import API from "@/components/subcomponents/scripts/apiCall";
import { useState, useEffect } from "react";
import Loading from "@/components/subcomponents/loadingPage/loading";
import style from "./dataUpdate.module.css";
import LinkButton from "@/components/subcomponents/button/link";
import DataInput from "./dataInput";
import { useRouter } from "next/navigation";
import Button from "@/components/subcomponents/button/button";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";

const DataUpdate = ({ params }) => {
  const api = API();
  const ln = params?.ln ? params.ln : "en";
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [certData, setCertData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const poppulateOrderData = async () => {
    await api
      .crud("GET", `certificate/order/${params.orderId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setOrderData(res);
          setCertData(res.certificates);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    poppulateOrderData();
  }, []);

  if (!orderData) return <Loading />;

  const savedata = async () => {
    setIsLoading(true);
    await api
      .crud("POST", `certificate/order/update`, {
        orderId: params.orderId,
        certificates: certData,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Update Certificate Data</div>
      <div className={style.navContainer}>
        <div className={style.buttonContainer}>
          <LinkButton
            href={`/order/update/template/${params.orderId}`}
            text="<< Back"
            variant={"primary"}
          />
        </div>
        <div className={style.buttonContainer}>
          <Button
            onClick={async () => {
              setIsLoading(true);
              await savedata();
              router.push(`${ln}/order/${params.orderId}`);
              setIsLoading(false);
            }}
            text="Next >>"
            variant={"primary"}
          />
        </div>
      </div>

      {orderData && certData && certData.length > 0 && (
        <DataInput
          certData={certData}
          setCertData={setCertData}
          savedata={savedata}
          isLoading={isLoading}
        />
      )}
      {isLoading && <LocalLoading />}
    </div>
  );
};

export default DataUpdate;
