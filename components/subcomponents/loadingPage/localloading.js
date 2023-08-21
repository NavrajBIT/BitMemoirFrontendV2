import style from "./loading.module.css";
import Image from "next/image";

const LocalLoading = ({ text }) => {
  return (
    <div className={style.localloading}>
      <div className={style.loadingContainer}>
        <Image src={"/icons/loading.svg"} fill={true} alt="Loading..." />
      </div>
      {text && <div className={style.loadingtext}>{text}</div>}
    </div>
  );
};

export default LocalLoading;
