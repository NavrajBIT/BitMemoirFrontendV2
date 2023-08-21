import style from "../dashboard.module.css";

const Tabs = ({ usedash }) => {
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
      <TabButton title="Profile" usedash={usedash} />
      <TabButton title="Orders" usedash={usedash} />
      <TabButton title="Certificates" usedash={usedash} />
    </div>
  );
};

export default Tabs;

const TabButton = ({ title, usedash }) => {
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
      {title}
    </div>
  );
};
