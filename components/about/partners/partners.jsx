import { partnersData } from "./partnersData";
import Image from "next/image";

const Partners = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "auto",
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
        }}
      >
        Our Partners
      </div>

      {partnersData.map((partner, index) => {
        return (
          <Image
            key={partner}
            src={partner.img}
            alt={partner}
            height={150}
            width={200}
          />
        );
      })}
    </div>
  );
};

export default Partners;
