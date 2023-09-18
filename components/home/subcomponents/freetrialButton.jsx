"use client";

import Button from "@/components/subcomponents/button/button";
import { useRouter } from "next/navigation";

const FreetrialButton = () => {
  const router = useRouter();
  return (
    <div style={{
      width: "fit-content",
      margin: window.innerWidth < 768 && 'auto'
    }}>
      <Button
        variant="emphasis"
        text="Free Trial"
        endIcon={"arrow-right"}
        onClick={() => {
          localStorage.setItem("nextRoute", "/trial");
          router.push("/trial");
        }}
      />
    </div>
  );
};

export default FreetrialButton;
