"use client";
import { useState } from "react";
import SideBar from "./subcomponents/sideBar";
import Main from "./subcomponents/main";
import SideToolBar from "./subcomponents/sideToolBar";

const CertCreator = () => {
    const [variable, setVariable] = useState("");
    const [tool, setTool] = useState("");
    return (
        <div
        style={{
            width:"100%" ,
            display:"flex",
        }}
         >
            <SideBar variable={variable} setVariable={setVariable}
            /> 
            <Main variable={variable} setVariable={setVariable} 
            tool={tool}
            setTool={setTool}
            />
            <SideToolBar 
            tool={tool}
            setTool={setTool}
            />
        </div>
    )
}


export default CertCreator;