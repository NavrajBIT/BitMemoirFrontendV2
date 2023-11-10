import LinkButton from "@/components/subcomponents/button/link";
import style from "../dashboard.module.css";
import FreetrialButton from "@/components/home/subcomponents/freetrialButton";
import t from "../translation";

const Subscriptions = ({ usedash, ln }) => {
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
        {t["Subscriptions"][ln]}
      </div>
      {t["Certificate balance"][ln]} : {usedash.nftQuota}
      {usedash.subscriptions &&
        usedash.subscriptions?.map((plan, index) => {
          if (parseInt(plan.nft_quota) > 0)
            return (
              <div key={"subscription-plan-" + index}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "1.5rem" }}>
                    {plan.plan} Subscription
                  </div>
                  <div>
                    {t["Available certificates"][ln]} : {plan.nft_quota}
                  </div>
                </div>
              </div>
            );
        })}
      {usedash.trial &&
        usedash.trial.is_active &&
        parseInt(usedash.trial.nft_quota) > 0 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.5rem" }}>{t["Free Trial"][ln]}</div>
              <div>
                {t["Available certificates"][ln]} : {usedash.trial.nft_quota}
              </div>
            </div>
          </div>
        )}
      {usedash.trial && !usedash.trial.is_active ? (
        <FreetrialButton ln={ln} />
      ) : (
        <div style={{ width: "fit-content" }}>
          <LinkButton
            text={t["Buy Subscription"][ln]}
            href={`/${ln}/subscription`}
            variant={"primary"}
          />
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
