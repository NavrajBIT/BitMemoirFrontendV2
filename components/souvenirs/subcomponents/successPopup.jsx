import Popup from "@/components/subcomponents/popup/popup";
import Button from "@/components/subcomponents/button/button";
import style from "@/components/issue/issue.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";

const SuccessPopup = () => {
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
          Certificate Order Submitted Successfully!
        </div>
        <div>
          <Button
            text="Order Details"
            variant={"tertiary"}
            onClick={() => router.push(`/dashboard`)}
          />
        </div>
        <div style={{ width: "10rem" }}>
          <Button text="OK" variant={"primary"} onClick={() => router.back()} />
        </div>
      </div>
    </Popup>
  );
};

export default SuccessPopup;
