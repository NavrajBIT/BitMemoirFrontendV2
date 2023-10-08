import style from "./popup.module.css";

const Popup = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div className={style.popupChild}>{children}</div>
    </div>
  );
};

export default Popup;
