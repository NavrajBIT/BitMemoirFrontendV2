const { useState, useEffect } = require("react");
import API from "../subcomponents/scripts/apiCall";
import { isValidNearAddress } from "../subcomponents/scripts/scripts";

//Code not Refactored
const useSouvenirs = () => {
  const api = API();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [certId, setCertId] = useState(null);
  const [frames, setFrames] = useState(null);
  const [selectedFrame, setSelectedframe] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [email, setEmail] = useState(null);
  const [framePopup, setframePopup] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [nftQuota, setNftQuota] = useState(null);

  useEffect(() => {
    getFrames();
    poppulateNFTQuota();
    setSelectedframe(null);
  }, []);

  const poppulateNFTQuota = async () => {
    await api
      .crud("GET", `subscription/nftQuota`)
      .then((res) => {
        if (res.status === 404) setNotFound(true);
        if (res.status >= 200 && res.status <= 299) {
          setNftQuota(parseInt(res.nft_quota));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = async (image) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("image", image);
    let endpoint = "certificate/souvenir";
    let method = "POST";
    if (image && certId) {
      endpoint = endpoint + "/" + certId;
      method = "PATCH";
    }
    await api
      .crud(method, endpoint, formData, true)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setCertId(res.certificate_id);
          setImage(res.image_url);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const addFrame = async (framefile, framename) => {
    setframePopup(false);
    setIsLoading(true);
    let formData = new FormData();
    formData.append("frame_image", framefile);
    formData.append("frame_name", framename);
    await api
      .crud("POST", "certificate/frame", formData, true)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          getFrames();
          setSelectedframe(res);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const getFrames = async () => {
    setIsLoading(true);
    await api
      .crud("GET", "certificate/frame")
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setFrames(res);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const publishSouvenir = async () => {
    if (
      accountId !== null &&
      accountId !== "" &&
      !isValidNearAddress(accountId)
    ) {
      setStatus("Invalid Account Id.");
      return;
    }
    setIsLoading(true);
    let endpoint = "certificate/souvenir/" + certId;
    let method = "PATCH";
    let formData = new FormData();
    if (accountId && accountId !== "") formData.append("wallet", accountId);
    if (email && email !== "") formData.append("email", email);
    if (selectedFrame) formData.append("frame", parseInt(selectedFrame.id));
    formData.forEach(function (value, key) {
      console.log(key + ": " + value);
    });
    await api
      .crud(method, endpoint, formData, true)
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          setStatus("Souvenir issued successfully.");
          setCertId(null);
          setImage(null);
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  return {
    isLoading,
    handleImageUpload,
    image,
    certId,
    frames,
    accountId,
    setAccountId,
    email,
    setEmail,
    framePopup,
    setframePopup,
    addFrame,
    selectedFrame,
    setSelectedframe,
    previewPopup,
    setPreviewPopup,
    publishSouvenir,
    status,
    setStatus,
    nftQuota,
  };
};

export default useSouvenirs;
