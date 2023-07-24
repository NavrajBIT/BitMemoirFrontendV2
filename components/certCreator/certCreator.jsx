"use client";

import useCertCreator from "./useCertCreator";
import SideToolBar from "./subcomponents/sideToolBar";
import TopToolBar from "./subcomponents/topToolBar";
import Template from "./subcomponents/template";

const CertCreator = () => {
  const creator = useCertCreator();
  return (
    <div
      style={{ minHeight: "var(--min-height)", padding: "var(--padding-main)" }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        Create New Template
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <SideToolBar creator={creator} />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--padding-main)",
          }}
        >
          <TopToolBar creator={creator} />
          <Template creator={creator} />
        </div>
      </div>
    </div>
  );
};

export default CertCreator;
