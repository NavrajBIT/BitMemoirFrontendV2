import style from "../home.module.css";
import FreetrialButton from "./freetrialButton";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className={style.heroContainer}>
      <section className={style.heroSection}>
        <HeroContent />
        <DesktopIllustration />
        <MobileIllustration />
      </section>
    </div>
  );
};

export default HeroSection;

const HeroContent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--padding-main)",
    }}
  >
    <div
      style={{
        fontSize: "4rem",
        fontWeight: "700",
      }}
    >
      BitMemoir <br />
      for Education
    </div>
    <div
      style={{
        fontSize: "1.5rem",
        color: "var(--primary-50)",
      }}
    >
      Revolutionizing Certification with Blockchain
    </div>

    <FreetrialButton />
  </div>
);

const DesktopIllustration = () => (
  <div className={style.desktopillustration}>
    <Image
      alt="BitMemoir"
      src={"/assets/images/hero_diamond_3.svg"}
      width={100}
      height={100}
    />
    <Image
      alt="BitMemoir"
      src={"/assets/images/hero_diamond_2.svg"}
      width={300}
      height={300}
    />
    <Image
      alt="BitMemoir"
      src={"/assets/images/hero_diamond_2.svg"}
      width={80}
      height={80}
    />
  </div>
);

const MobileIllustration = () => (
  <div className={style.mobileillustration}>
    <Image
      alt="BitMemoir"
      src={"/assets/images/hero_diamond.svg"}
      width={200}
      height={200}
    />
  </div>
);
