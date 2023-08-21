import React, { useState } from "react";

const Slider = ({ value, valueDisplay, handleChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--padding-light)",
      }}
    >
      <input
        type="range"
        min={0}
        max={200}
        value={value}
        onChange={handleChange}
      />
      <p>{valueDisplay}</p>
    </div>
  );
};

export default Slider;
