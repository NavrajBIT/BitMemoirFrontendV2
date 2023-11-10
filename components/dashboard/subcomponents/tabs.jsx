import style from "../dashboard.module.css";
import t from "../translation";

const Tabs = ({ usedash, ln }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        padding: "var(--padding-main)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--padding-light)",
      }}
    >
      <TabButton title="Profile" usedash={usedash} ln={ln} />
      <TabButton title="Orders" usedash={usedash} ln={ln} />
      <TabButton title="Certificates" usedash={usedash} ln={ln} />
    </div>
  );
};

export default Tabs;

const TabButton = ({ title, usedash, ln }) => {
  return (
    <div
      className={style.tabButton}
      style={{
        background:
          usedash.selectedTab === title ? "var(--primary-60)" : "transparent",
        fontWeight: usedash.selectedTab === title ? "700" : "400",
      }}
      onClick={() => usedash.setSelectedTab(title)}
    >
      {t[title][ln]}
    </div>
  );
};
