import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

const Logo = () => {
  const [isSelected, setIsSelected] = useState(true);
  const handleStart = (e) => console.log(e);
  const handleDrag = (e) => console.log(e);
  const handleStop = (e) => console.log(e);

  return (
    <Draggable
      handle="#handle"
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        style={{
          width: "0px",
          height: "0px",
          background: "red",
          position: "relative",
        }}
      >
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}
          resizeHandles={["se"]}
          handle={
            <div
              style={{ background: "red", height: "100px", width: "100px" }}
            ></div>
          }
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            zIndex: 1,
            border: "1px solid black",
          }}
        >
          <span>Contents</span>
        </ResizableBox>
        <div
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            zIndex: 1,
          }}
          id="handle"
        >
          <Image fill src="/assets/logo.png" />
        </div>
      </div>
    </Draggable>
  );
};

export default Logo;
