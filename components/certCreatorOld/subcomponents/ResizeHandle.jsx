import React from "react";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
const ResizeHandle = () => {
  return (
    <div>
      <Brightness1OutlinedIcon
        sx={{
          fontSize: 13,
          margin: 0.5,
          backgroundColor: "white",
          borderRadius: "50%"
        }}
      />
    </div>
  );
};

export default ResizeHandle;
