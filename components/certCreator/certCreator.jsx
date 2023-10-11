"use client";
import SideToolBar from "./tools/sideToolBar";
import useCertCreator from "./useCertCreator";
import TopToolBar from "./tools/topToolBar";
import BottomToolBar from "./tools/bottomToolBar";
import Canvas from "./canvas";
import Popup from "../subcomponents/popup/popup";
import VariableSelector from "./tools/variableSelector";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import NotFound from "../subcomponents/errorPages/notFound";
import WentWrong from "../subcomponents/errorPages/wentWrong";
import TutorialPopup from "./tutorialPopup";
import NoqrPopup from "./noqrPopup";
import SaveAsPopup from "./saveasPopup";

const CertCreator = ({ params }) => {
  const creator = useCertCreator(params);

  if (creator.loadingStatus === "notFound") {
    return <NotFound />;
  }
  if (creator.loadingStatus === "error") {
    return <WentWrong />;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <SideToolBar creator={creator} />
      <BottomToolBar creator={creator} />

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

      {creator.isSelectingvariable && (
        <Popup>
          <VariableSelector
            close={() => creator.setIsSelectingVariable(false)}
            selectvariable={creator.addVariable}
          />
        </Popup>
      )}
      {creator.loadingStatus !== "" && (
        <LocalLoading text={creator.loadingStatus} />
      )}
      <TutorialPopup />
      {creator.noQR && <NoqrPopup creator={creator} />}
      {creator.saveaspopup && <SaveAsPopup creator={creator} />}
    </div>
  );
};

export default CertCreator;
