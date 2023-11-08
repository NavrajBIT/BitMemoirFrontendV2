import TeamCard from "./teamCard";
import { teamData } from "./teamData";

const Team = ({ ln }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
        backgroundImage: "url('/assets/images/productSuiteBackground.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "var(--border-radius)",
        padding: "var(--padding-main)",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "2rem",
          fontWeight: "700",
          top: "-1.5rem",
          left: "var(--padding-main)",
          color: "var(--primary-50)",
        }}
      >
        {ln === "en" && "Founding Team"}
        {ln === "es" && "Equipo fundador"}
        {ln === "ar" && "الفريق المؤسس"}
      </div>

      {teamData.map((teamMember, index) => {
        return (
          <TeamCard
            key={index + teamMember}
            name={teamMember.name}
            designation={teamMember.designation}
            img={teamMember.img}
          />
        );
      })}
    </div>
  );
};

export default Team;
