"use client";
import { useState } from "react";
import SideBar from "./subcomponents/sideBar";
import Main from "./subcomponents/main";
import SideToolBar from "./subcomponents/sideToolBar";
import useCertCreator from "./useCertCreator";
import TopToolBar from "./subcomponents/topToolBar";
import Canvas from "./subcomponents/canvas";

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
      <SideToolBar tool={tool} setTool={setTool} />
    </div>
  );
};

export default CertCreator;
