import Team from "./team/team";
import Partners from "./partners/partners";

const About = () => {
  return (
    <div
      style={{
        minHeight: "var(--min-height-screen)",
        paddingTop: "var(--padding-large)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-large)",
      }}
    >
      <Team />
      <Partners />
    </div>
  );
};

export default About;
