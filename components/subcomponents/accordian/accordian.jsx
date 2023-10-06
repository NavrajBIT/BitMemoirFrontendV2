"use client";
const { useState } = require("react");
import Image from "next/image";

const Accordian = ({ heading, text }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        backgroundColor: "var(--primary-100)",
        margin: "auto",
      }}
    >
      <div
        onClick={() => setIsActive((prev) => !prev)}
        style={{
          padding: "var(--padding-main)",
          borderBottom: "2px solid  var(--primary-90)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {heading}
        <span
          style={{
            transform: isActive ? "rotate(180deg)" : "none",
            transition: "all 0.3s",
          }}
        >
          <Image
            src={"/icons/down-arrow.svg"}
            height={10}
            width={15}
            alt="arrow"
          />
        </span>
      </div>
      <div
        style={{
          padding: isActive ? "var(--padding-main)" : "0",
          backgroundColor: isActive ? "var(--primary-90)" : "transparent",
          maxHeight: isActive ? "100%" : "0em",
          fontSize: isActive ? "1rem" : "0rem",
          transform: isActive ? "scaleY(1)" : "scaleY(0)",
          transition: "all 0.3s",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export default Accordian;
