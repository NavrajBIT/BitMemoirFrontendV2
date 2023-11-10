import style from "./subscription.module.css";
import Button from "../subcomponents/button/button";
import LinkButton from "../subcomponents/button/link";

const SubscriptionCard = ({ title, certificates, price, ln }) => {
  return (
    <div className={style.subscriptioncardcontainer}>
      <div className={style.subscriptioncardoverlay} />
      <div className={style.subscriptioncardtitle}>{title}</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {certificates}
        </div>
        <div style={{ fontSize: "1.5rem" }}>Certificates</div>
      </div>
      <div
        style={{
          width: "100%",
          background: "var(--primary-110)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--padding-main)",
          fontSize: "1.25rem",
        }}
      >
        {price}$ / Certificate
      </div>
      <div
        style={{
          width: "fit-content",
        }}
      >
        <LinkButton
          text="Buy Now"
          variant={"primary"}
          href={`/${ln}/checkout/${title}`}
        />
      </div>
    </div>
  );
};

export default SubscriptionCard;
