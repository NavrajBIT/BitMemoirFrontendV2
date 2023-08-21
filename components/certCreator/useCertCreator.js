import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";

const useCertCreator = (params) => {
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [isSelectingvariable, setIsSelectingVariable] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [scale, setScale] = useState(100);
  const [variables, setVariables] = useState({
    text: [],
    logo: [],
    variable: [],
    qrcode: [],
  });

  const [selectedVariable, setSelectedVariable] = useState(null);
  const api = API();
  const endpoint = `certificate/template/${params.templateId}`;

  const poppulatetemplateData = (data) => {
    setTemplateName(data.name);
    let newvariableData = {
      text: data.texts,
      logo: data.logos,
      variable: data.variables,
      qrcode: data.qrcodes,
    };
    setVariables(newvariableData);
    if (data.base_image !== null) {
      setUploadedImageURL(data.base_image);
    }
  };

  useEffect(() => {
    api
      .crud("GET", endpoint)
      .then((res) => {
        console.log(res);
        if (res.status === 404) {
          setLoadingStatus("notFound");
        } else {
          setLoadingStatus("");
          poppulatetemplateData(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus("error");
      });
  }, []);

  useEffect(() => {
    adjustScale();
    window.addEventListener("resize", adjustScale);

    return () => {
      window.removeEventListener("resize", adjustScale);
    };
  }, []);

  const save = async () => {
    setLoadingStatus("Saving Template...");
    let logoData = variables.logo;
    if (logoData.length > 0) {
      await Promise.all(
        logoData.map(async (logo, index) => {
          let newLogodata = { ...logo };
          delete newLogodata["logo_image"];
          await api
            .crud("PATCH", `certificate/logo/${logo.id}`, newLogodata)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
      );
    }
    let apiData = {
      name: templateName,
      texts: variables.text,
      variables: variables.variable,
      qrcodes: variables.qrcode,
    };
    console.log(apiData);
    await api
      .crud("PATCH", endpoint, apiData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          poppulatetemplateData(res);
        }
      })
      .catch((err) => console.log(err));
    setLoadingStatus("");
  };

  const saveas = () => {
    console.log("Save As");
  };

  const adjustScale = () => {
    let windowWidth = window.innerWidth;
    const requiredFullWidth = 1080;
    if (windowWidth < requiredFullWidth) {
      setScale(Math.round((windowWidth / requiredFullWidth) * 100 - 5));
    } else {
      setScale(100);
    }
  };

  const handleKeyPress = (event) => {
    if (isSelectingvariable) return;
    if (event.key === "Delete") {
      deletevariable();
    }
    if (event.key === "t") {
      addText();
    }
    if (event.key === "v") {
      setIsSelectingVariable(true);
    }
    if (event.key === "l") {
      addLogo();
    }
    if (event.key === "q") {
      addQrcode();
    }
    if (event.ctrlKey && event.key === "s") {
      save();
    }
    // if (event.ctrlKey && event.sh event.key === "s") {
    //   saveas();
    // }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setUploadedImageName(null);
  };

  const selectImage = async (file) => {
    const fileName = file.name.replace(/\s+/g, "_");
    if (
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg")
    ) {
      const newFile = new File([file], fileName, { type: file.type });
      const formdata = new FormData();
      formdata.append("base_image", newFile);
      setLoadingStatus("Uploading...");
      await api
        .crud("PATCH", endpoint, formdata, true)
        .then((res) => {})
        .catch((err) => alert("Could not upload image."));
      await save();
      setLoadingStatus("");
    } else {
      alert("Please select a valid image file.");
    }
  };

  const addText = () => {
    setVariables((prev) => ({
      ...prev,
      text: [
        ...prev.text,
        {
          value: "Enter text here...",
          x_pos: 100,
          y_pos: 100,
          font_size: 16,
          font: "Crimson",
          is_bold: false,
          is_italic: false,
          color: "000000",
        },
      ],
    }));
  };
  const addLogo = () => {
    const myInput = document.createElement("input");
    myInput.setAttribute("type", "file");
    const handleUpload = async (e) => {
      const file = e.target.files[0];
      const fileName = file.name.replace(/\s+/g, "_");
      if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        const newFile = new File([file], fileName, { type: file.type });
        const formdata = new FormData();
        formdata.append("logo_image", newFile);
        formdata.append("height", 100);
        formdata.append("width", 100);
        formdata.append("x_pos", 100);
        formdata.append("y_pos", 100);
        formdata.append("template", params.templateId);
        setLoadingStatus("Uploading...");
        await api.crud("POST", "certificate/logo", formdata, true);
        setLoadingStatus("");
        await save();
        myInput.remove();
      } else {
        alert("Please select a valid image file.");
        myInput.remove();
      }
    };
    myInput.addEventListener("change", handleUpload);
    myInput.click();
  };

  const addVariable = (variablename) => {
    setVariables((prev) => ({
      ...prev,
      variable: [
        ...prev.variable,
        {
          name: variablename,
          x_pos: 100,
          y_pos: 100,
          font: "Crimson",
          font_size: 25,
          is_bold: false,
          is_italic: false,
          color: "000000",
          width: 500,
          height: 100,
        },
      ],
    }));
  };

  const addQrcode = () => {
    setVariables((prev) => ({
      ...prev,
      qrcode: [
        ...prev.qrcode,
        {
          logo_image: "/assets/images/qrcode.svg",
          height: 100,
          width: 100,
          x_pos: 100,
          y_pos: 100,
          color: "000000",
        },
      ],
    }));
  };

  const deletevariable = () => {
    console.log(selectedVariable);
    if (selectedVariable === null) return;
    setVariables((prev) => {
      const newArr = [
        ...prev[selectedVariable.type].slice(0, selectedVariable.index),
        ...prev[selectedVariable.type].slice(selectedVariable.index + 1),
      ];
      const newObject = { ...prev };
      newObject[selectedVariable.type] = newArr;
      return newObject;
    });
    setSelectedVariable(null);
  };

  return {
    loadingStatus,
    isSelectingvariable,
    setIsSelectingVariable,
    uploadedImageURL,
    uploadedImageName,
    selectImage,
    removeImage,
    templateName,
    setTemplateName,
    scale,
    setScale,
    variables,
    setVariables,
    addText,
    addLogo,
    addVariable,
    addQrcode,
    selectedVariable,
    setSelectedVariable,
    deletevariable,
    save,
    saveas,
  };
};

export default useCertCreator;
