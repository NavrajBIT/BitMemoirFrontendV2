import Popup from "../subcomponents/popup/popup";
import { useState, useEffect } from "react";
import Button from "../subcomponents/button/button";

const TutorialPopup = () => {
  const [isTutorial, setIsTutorial] = useState(false);

  useEffect(() => {
    let tutorial = localStorage.getItem("certCreatorTutorial");
    if (tutorial && tutorial === "true") {
      setTimeout(() => setIsTutorial(true), 10000);
    }
  }, []);

  if (!isTutorial) return null;

  return (
    <Popup>
      <div
        style={{
          width: "100%",
          background: "var(--primary-100)",
          padding: "var(--padding-main)",
          gap: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--primary-50)" }}>
          Tutorial
        </div>
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WKbHG4K48jU?si=2PjrNUkAzpND03u6"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <Button
              text="Don't show"
              variant={"secondary"}
              onClick={() => {
                localStorage.setItem("certCreatorTutorial", false);
                setIsTutorial(false);
              }}
            />
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              text="Watch Later"
              variant={"primary"}
              onClick={() => {
                setIsTutorial(false);
              }}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default TutorialPopup;
