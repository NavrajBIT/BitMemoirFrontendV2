import { useState, useEffect } from "react";

const useCertCreator = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
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

  useEffect(() => {
    adjustScale();
    window.addEventListener("resize", adjustScale);
    return () => {
      window.removeEventListener("resize", adjustScale);
    };
  }, []);

  const adjustScale = () => {
    let windowWidth = window.innerWidth;
    console.log(windowWidth);
    const requiredFullWidth = 1080;
    if (windowWidth < requiredFullWidth) {
      setScale(Math.round((windowWidth / requiredFullWidth) * 100 - 5));
    } else {
      setScale(100);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setUploadedImageName(null);
  };

  const selectImage = (file) => {
    const fileName = file.name.replace(/\s+/g, "_");
    if (
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg")
    ) {
      const newFile = new File([file], fileName, { type: file.type });
      setUploadedImage(newFile);
      setUploadedImageName(fileName);
      let filereader = new FileReader();
      filereader.addEventListener("load", () => {
        setUploadedImage(filereader.result);
      });
      filereader.readAsDataURL(newFile);
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
          font: "Arial",
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
    const handleUpload = (e) => {
      const file = e.target.files[0];
      const fileName = file.name.replace(/\s+/g, "_");
      if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        const newFile = new File([file], fileName, { type: file.type });
        let filereader = new FileReader();
        filereader.addEventListener("load", () => {
          setVariables((prev) => ({
            ...prev,
            logo: [
              ...prev.logo,
              {
                logo_image: filereader.result,
                height: 100,
                width: 100,
                x_pos: 100,
                y_pos: 100,
              },
            ],
          }));

          myInput.remove();
        });
        filereader.readAsDataURL(newFile);
      } else {
        alert("Please select a valid image file.");
        myInput.remove();
      }
    };
    myInput.addEventListener("change", handleUpload);
    myInput.click();
  };

  const addVariable = () => {
    setVariables((prev) => ({
      ...prev,
      variable: [
        ...prev.variable,
        {
          name: "Student Name",
          x_pos: 100,
          y_pos: 100,
          font: "Arial",
          font_size: 25,
          is_bold: false,
          is_italic: false,
          color: "000000",
          width: 300,
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
    uploadedImage,
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
  };
};

export default useCertCreator;
