import style from "./loading.module.css";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={style.loadingpage}>
      <div className={style.loadingContainer}>
        <Image src={"/icons/loading.svg"} fill={true} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loading;
