import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "../order.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SuccessPopup = ({ close }) => {
  const router = useRouter();
  return (
    <Popup>
      <div
        className={style.confirmContainer}
        style={{ padding: "var(--padding-main)" }}
      >
        <Image
          src={"/icons/success.svg"}
          alt={"Done"}
          width={300}
          height={300}
        />

        <div style={{ fontSize: "1.5rem", color: "var(--primary-50)" }}>
          Certificates Issued Successfully!
        </div>

        <div style={{ width: "10rem" }}>
          <Button text="OK" variant={"primary"} onClick={close} />
        </div>
      </div>
    </Popup>
  );
};

export default SuccessPopup;
