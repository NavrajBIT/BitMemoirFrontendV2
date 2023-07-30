"use client";
import TemplateBar from "./subcomponents/templateBar";
import Arrow from "./subcomponents/arrow";
import FullViewTemplate from "./subcomponents/fullViewTemplate";

const Certificate = () => {
  
  return (
    <div style={{width:"100%" ,display:"flex"}} >
      <TemplateBar />
      <Arrow />
      <FullViewTemplate />
    </div>
  );
};

export default Certificate;
