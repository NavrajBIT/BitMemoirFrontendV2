"use client";
import { useState } from "react";
import SideBar from "./tools/sideBar";
import Main from "./subcomponents/main";
import SideToolBar from "./tools/sideToolBar";
import useCertCreator from "./useCertCreator";
import TopToolBar from "./tools/topToolBar";
import Canvas from "./canvas";

const CertCreator = () => {
  const [variable, setVariable] = useState("");
  const [tool, setTool] = useState("");
  const creator = useCertCreator();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <SideBar variable={variable} setVariable={setVariable} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-main)",
        }}
      >
        <TopToolBar creator={creator} />
        <Canvas creator={creator} />
      </div>
      <SideToolBar creator={creator} />
    </div>
  );
};

export default CertCreator;
