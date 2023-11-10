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
import ImageSizePopup from "./imageSizePopup";

const CertCreator = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
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
      <SideToolBar creator={creator} dynamic={params.dynamic} ln={ln} />
      <BottomToolBar creator={creator} dynamic={params.dynamic} ln={ln} />

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
        <TopToolBar
          creator={creator}
          templateId={params.templateId}
          dynamic={params.dynamic}
          orderId={params.orderId}
          ln={ln}
        />
        <Canvas creator={creator} />
      </div>

      {creator.isSelectingvariable && (
        <Popup>
          <VariableSelector
            close={() => creator.setIsSelectingVariable(false)}
            selectvariable={creator.addVariable}
            ln={ln}
          />
        </Popup>
      )}
      {creator.loadingStatus !== "" && (
        <LocalLoading text={creator.loadingStatus} />
      )}
      <TutorialPopup ln={ln} />
      {creator.noQR && <NoqrPopup creator={creator} ln={ln} />}
      {creator.saveaspopup && <SaveAsPopup creator={creator} ln={ln} />}
      {creator.imagequalityPopup && (
        <ImageSizePopup creator={creator} ln={ln} />
      )}
    </div>
  );
};

export default CertCreator;
