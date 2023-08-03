import { useState, useEffect } from "react";

const useCertCreator = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [scale, setScale] = useState(100);
  const [variables, setVariables] = useState({
    text: [
      {
        value: "Enter text here...",
        x_pos: 0,
        y_pos: 0,
        font_size: 16,
        font: "Arial",
        is_bold: false,
        is_italic: false,
        color: "000000",
      },
    ],
  });

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
  };
};

export default useCertCreator;
