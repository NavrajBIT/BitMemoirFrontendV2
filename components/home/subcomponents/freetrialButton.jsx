"use client";
import Button from "@/components/subcomponents/button/button";
import { useRouter } from "next/navigation";
import { text } from "../translation";

const FreetrialButton = ({ ln }) => {
  const router = useRouter();
  return (
    <div style={{ width: "fit-content" }}>
      <Button
        variant="emphasis"
        text={text["Free Trial"][ln]}
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
