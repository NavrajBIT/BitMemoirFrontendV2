import { useState } from "react";
import Image from "next/image";
import style from "../certCreator.module.css";

const SideTool = ({ icon, toolName, toolDescription }) => {
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
    >
      <Image height={30} width={30} alt="" src={"/icons/" + icon + ".svg"} />
      {showTooltip && (
        <div className={style.tooltip}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>{toolName}</div>
          <div style={{ fontSize: "0.5rem" }}>{toolDescription}</div>
        </div>
      )}
    </button>
  );
};

export default SideTool;
