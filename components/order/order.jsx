"use client";
import useOrder from "./useOrder";
import LocalLoading from "../subcomponents/loadingPage/localloading";
import OrderHeading from "./subcomponents/orderHeading";
import Certificates from "./subcomponents/certificates";
import Button from "../subcomponents/button/button";
import NotFound from "../subcomponents/errorPages/notFound";
import Approval from "./subcomponents/approval";
import CertificateEditPopup from "./subcomponents/certificateEditPopup";
import DynamicUpdate from "./subcomponents/dynamicUpdate";
import SuccessPopup from "./subcomponents/successPopup";
import PlanExpired from "../subscriptions/planExpired";
import t from "./translation";

const Order = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const orderer = useOrder(params);

  if (orderer.notFound) return <NotFound />;

  if (orderer.orderDetails === null || orderer.isLoading) {
    return (
      <div style={{ minHeight: "var(--min-height-screen)" }}>
        <LocalLoading text={"Loading order details..."} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        maxWidth: "var(--max-width)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      {orderer.templateDetails !== null && (
        <OrderHeading orderer={orderer} ln={ln} />
      )}
      {orderer.orderDetails &&
        orderer.orderDetails.approvals &&
        orderer.orderDetails.approvals.length > 0 && (
          <Approval orderer={orderer} ln={ln} />
        )}

      {orderer.orderDetails &&
        orderer.orderDetails.type === "dynamic" &&
        orderer.orderDetails.modelStatus === "issued" && (
          <DynamicUpdate update={orderer.updatecerts} ln={ln} />
        )}
      {orderer.orderDetails.modelStatus === "pending" && (
        <div
          style={{
            textAlign: "center",
            padding: "var(--padding-main)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
            }}
          >
            {t["Certificate Preview"][ln]}
          </div>
          <div>{t["Review and Edit the Certificates before Issuing."][ln]}</div>
        </div>
      )}
      <Certificates orderer={orderer} ln={ln} />
      {orderer.orderDetails.modelStatus === "pending" && (
        <div
          style={{
            width: "fit-content",
            margin: "auto",
          }}
        >
          <Button
            text={t["Issue >>"][ln]}
            variant={"primary"}
            onClick={orderer.issueOrder}
          />
        </div>
      )}
      {orderer.certificateDetailsPopup && (
        <CertificateEditPopup
          certId={orderer.selectedCertId}
          close={() => {
            orderer.poppulateOrderDetails();
            orderer.setcertificatedetailsPopup(false);
          }}
        />
      )}
      {orderer.successPopup && (
        <SuccessPopup close={() => orderer.setSuccessPopup(false)} />
      )}
      {orderer.isBuyPopup && <PlanExpired ln={ln} />}
    </div>
  );
};

export default Order;
