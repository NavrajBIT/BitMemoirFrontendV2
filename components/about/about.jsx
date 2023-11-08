import Team from "./team/team";
import Partners from "./partners/partners";

const About = ({ params }) => {
  const ln = params?.ln ? params.ln : "ens";
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
      <Team ln={ln} />
      <Partners ln={ln} />
    </div>
  );
};

export default About;
