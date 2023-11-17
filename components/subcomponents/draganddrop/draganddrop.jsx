import { useRef } from "react";
import style from "./draganddrop.module.css";
import Image from "next/image";

const Draganddrop = ({ submitFile, file, ln }) => {
  const buttonRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    submitFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    submitFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={style.fileuploadcontainer}>
      <div
        className={style.droparea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => buttonRef.current.click()}
        style={
          file && {
            backgroundImage: `url(${file})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }
        }
      >
        <Image
          src={"/icons/upload.svg"}
          height={100}
          width={100}
          alt="upload"
        />
        <div
          style={{
            background: "var(--primary-100)",
            padding: "var(--padding-light)",
            borderRadius: "var(--border-radius)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--padding-main)",
          }}
        >
          <div>
            {ln === "en" && "Drag & Drop here..."}
            {ln === "es" && "Arrastra el archivo aqui..."}
            {ln === "ar" && "السحب والإسقاط هنا..."}
          </div>
          <div>
            {ln === "en" && "OR"}
            {ln === "es" && "O"}
            {ln === "ar" && "أو"}
          </div>
          <div>
            {ln === "en" && "Click to Upload."}
            {ln === "es" && "Click aquí para cargar"}
            {ln === "ar" && "انقر للتحميل."}
          </div>
        </div>
        <input
          ref={buttonRef}
          type="file"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png, .gif"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Draganddrop;
