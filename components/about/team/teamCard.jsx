const TeamCard = (props) => {
  return (
    <div
      style={{
        border: "0.1px solid #007B94",
        background: "#002E37",
        width: "12rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 8px",
        margin: "1.5rem",
      }}
    >
      <img src={props.img} alt={props.name} style={{ width: "100%" }} />
      <span style={{ marginTop: "10px",fontSize:'14px' }}>{props.designation}</span>
      <h4
        style={{
          margin: "1rem 0",
          color: "var(--primary-50)",
        }}
      >
        {props.name}
      </h4>
    </div>
  );
};

export default TeamCard;
