import { useState } from "react";
import Draganddrop from "../subcomponents/draganddrop/draganddrop";
import API from "../subcomponents/scripts/apiCall";

const Verifyfile = ({ setcid, setIsLoading, ln }) => {
  const api = API();
  const [fileURL, setFileURL] = useState(null);

  const showImage = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFileURL(reader.result);
    });
    reader.readAsDataURL(e);
  };

  const generateCID = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    await api
      .localCrud("POST", "certificate/getCID", formData, true)
      .then((res) => {
        setcid(res.cid);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width-form)",
        padding: "var(--padding-main)",
      }}
    >
      <Draganddrop
        submitFile={(e) => {
          showImage(e);
          generateCID(e);
        }}
        file={fileURL}
        ln={ln}
      />
    </div>
  );
};

export default Verifyfile;
