import Image from "next/image";

const TeamCard = (props) => {
  return (
    <div
      style={{
        border: "0.1px solid var(--primary-110)",
        background: "var(--primary-90)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--padding-light)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <Image src={props.img} alt={props.name} width={200} height={200} />
      

      <div
        style={{
          padding: "var(--padding-light)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        <div>{props.designation}</div>
        <div
          style={{
            color: "var(--primary-50)",
            fontWeight: "600",
            fontSize: "1.25rem",
          }}
        >
          {props.name}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
