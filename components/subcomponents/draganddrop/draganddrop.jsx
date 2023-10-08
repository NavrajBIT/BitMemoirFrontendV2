import { useRef } from "react";
import style from "./draganddrop.module.css";
import Image from "next/image";

const Draganddrop = ({ submitFile, file }) => {
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
          <div>Drag & Drop here...</div>
          <div>OR</div>
          <div>Click to Upload.</div>
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
