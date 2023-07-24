import style from "../certCreator.module.css";
import Image from "next/image";
import Logo from "./variables/logo";

const Template = ({ creator }) => {
  return (
    <div className={style.template}>
      {creator.uploadedImage && (
        <Image
          fill
          src={creator.uploadedImage}
          alt={creator.uploadedImageName}
          style={{ objectFit: "fill" }}
        />
      )}
      <Logo />
      <Logo />
    </div>
  );
};

export default Template;
