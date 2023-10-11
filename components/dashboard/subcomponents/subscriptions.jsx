import LinkButton from "@/components/subcomponents/button/link";
import style from "../dashboard.module.css";
import FreetrialButton from "@/components/home/subcomponents/freetrialButton";

const Subscriptions = ({ usedash }) => {
  return (
    <div
      className={style.sectionContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          position: "absolute",
          color: "var(--primary-50)",
          fontSize: "1.5rem",
          fontWeight: "700",
          top: "-1rem",
          left: "var(--padding-main)",
        }}
      >
        Subscriptions
      </div>
      Certificate balance : {usedash.nftQuota}
      {usedash.subscriptions &&
        usedash.subscriptions?.map((plan, index) => {
          if (parseInt(plan.nft_quota) > 0)
            return (
              <div key={"subscription-plan-" + index}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "1.5rem" }}>
                    {plan.plan} Subscription
                  </div>
                  <div>Available certificates : {plan.nft_quota}</div>
                </div>
              </div>
            );
        })}
      {usedash.trial &&
        usedash.trial.is_active &&
        parseInt(usedash.trial.nft_quota) > 0 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.5rem" }}>Free Trial</div>
              <div>Available certificates : {usedash.trial.nft_quota}</div>
            </div>
          </div>
        )}
      {usedash.trial && !usedash.trial.is_active ? (
        <FreetrialButton />
      ) : (
        <div style={{ width: "fit-content" }}>
          <LinkButton
            text={"Buy Subscription"}
            href={"/subscription"}
            variant={"primary"}
          />
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
