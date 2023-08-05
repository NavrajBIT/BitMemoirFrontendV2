"use client";
import { useState } from "react";
import Image from "next/image";
import style from "../certCreator.module.css";

const SideTool = ({ icon, toolName, toolDescription, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <button
      className={style.tool}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Image height={30} width={30} alt="" src={"/icons/" + icon + ".svg"} />
      {showTooltip && (
        <div className={style.tooltip}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--primary-50)",
            }}
          >
            {toolName}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--primary-50)" }}>
            {toolDescription}
          </div>
        </div>
      )}
    </button>
  );
};

export default SideTool;
