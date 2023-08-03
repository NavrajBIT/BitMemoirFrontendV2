import style from "../certCreator.module.css";
import Textvariable from "./textvariable";

const Canvas = ({ creator }) => {
  const canvasScale = creator.scale / 100;
  const index = 0;
  return (
    <div
      className={style.canvas}
      style={{
        transform: `scale(${canvasScale})`,
        backgroundImage: `url(${creator.uploadedImage})`,
      }}
    >
      <Textvariable
        data={creator.variables.text[index]}
        index={index}
        setVariables={creator.setVariables}
      />
    </div>
  );
};

export default Canvas;
