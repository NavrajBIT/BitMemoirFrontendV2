import Popup from "@/components/subcomponents/popup/popup";
import LocalLoading from "@/components/subcomponents/loadingPage/localloading";
import { useEffect, useState } from "react";
import Button from "@/components/subcomponents/button/button";
import DynamicForm from "@/components/subcomponents/form/dynamicForm";
import API from "@/components/subcomponents/scripts/apiCall";
import Image from "next/image";

const CertificateEditPopup = ({ certId, close }) => {
  const api = API();
  const [isLoading, setIsLoading] = useState(false);
  const [certdata, setcertdata] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [zoom, setZoom] = useState(false);
  const poppulateCertData = async () => {
    setIsLoading(true);
    await api.crud("GET", `certificate/${certId}`).then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status <= 299 && res.image !== null) {
        setcertdata({
          email: res.email,
          image: res.image,
          wallet: res.wallet,
          variablevalues: res.variablevalues,
        });
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    poppulateCertData();
  }, []);

  const modify = async () => {
    if (!hasChanged) {
      close();
      return;
    }
    setIsLoading(true);
    let apiData = { ...certdata };
    delete apiData.image;
    console.log(apiData);
    await api
      .crud("PATCH", `certificate/${certId}`, apiData)
      .then((res) => {
        setHasChanged(false);
        poppulateCertData();
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const getvariableformdata = () => {
    if (!certdata) return [];
    let variableformdata = [];
    if (certdata.variablevalues.length > 0) {
      certdata.variablevalues.map((variable, index) => {
        variableformdata.push({
          label: variable.variable_name,
          type: "text",
          required: true,
          value: certdata.variablevalues[index].value,
          maxLength: 500,
          setValue: (e) =>
            setcertdata((prev) => {
              setHasChanged(true);
              let newData = { ...prev };
              newData.variablevalues[index]["value"] = e.target.value;
              return newData;
            }),
        });
      });
    }
    return variableformdata;
  };

  const variableformdata = getvariableformdata();

  return (
    <Popup style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          background: "var(--primary-90)",
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        <div>(Click to Zoom)</div>
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            position: "relative",
            marginBottom: "2rem",
            cursor: "zoom-in",
          }}
          onClick={() => setZoom(true)}
        >
          <Image
            alt="certificate"
            fill
            src={
              certdata?.image && certdata.image !== ""
                ? certdata.image
                : "/icons/imageplaceholder.svg"
            }
          />
        </div>

        <DynamicForm
          formTitle={`Certificate Id : ${certId}`}
          formButton={hasChanged ? "Modify" : "OK"}
          handleSubmit={modify}
          isLoading={isLoading}
          formData={[
            {
              label: "Email",
              type: "email",
              value: certdata?.email,
              setValue: (e) =>
                setcertdata((prev) => {
                  setHasChanged(true);
                  let newData = { ...prev };
                  newData["email"] = e.target.value;
                  return newData;
                }),
            },
            {
              label: "Wallet",
              type: "text",
              value: certdata?.wallet,
              setValue: (e) =>
                setcertdata((prev) => {
                  setHasChanged(true);
                  let newData = { ...prev };
                  newData["wallet"] = e.target.value;
                  return newData;
                }),
              maxLength: 100,
            },
            ...variableformdata,
          ]}
        />

        <Button variant={"secondary"} text="Close X" onClick={close} />
      </div>
      {zoom && (
        <Popup>
          <div
            style={{
              width: "90vw",
              aspectRatio: "4/3",
              position: "relative",
              marginBottom: "2rem",
              cursor: "zoom-out",
            }}
            onClick={() => setZoom(false)}
          >
            <Image
              alt="certificate"
              fill
              src={
                certdata?.image && certdata.image !== ""
                  ? certdata.image
                  : "/icons/imageplaceholder.svg"
              }
            />
          </div>
        </Popup>
      )}
      {isLoading && <LocalLoading />}
    </Popup>
  );
};

export default CertificateEditPopup;
