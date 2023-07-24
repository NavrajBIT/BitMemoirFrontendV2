import { useState, useEffect } from "react";

const useCertCreator = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);
  const [templateName, setTemplateName] = useState("");

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
  };
};

export default useCertCreator;
