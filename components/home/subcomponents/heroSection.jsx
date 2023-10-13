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
      <div className={style.downarrow} />
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
      BitMemoir
    </div>
    <div
      style={{
        fontSize: "1.5rem",
        color: "var(--primary-50)",
      }}
    >
      Issue. Store. Verify. Retrieve.
    </div>

    <FreetrialButton />
  </div>
);

const DesktopIllustration = () => (
  <div className={style.desktopillustration}>
    <div className={style.smallIllustrationleft}>
      <Image
        alt="BitMemoir"
        src={"/assets/images/hero_diamond_3.svg"}
        width={100}
        height={100}
      />
    </div>
    <Image
      alt="BitMemoir"
      src={"/assets/images/hero_diamond_2.svg"}
      width={300}
      height={300}
    />
    <div className={style.smallIllustrationright}>
      <Image
        alt="BitMemoir"
        src={"/assets/images/hero_diamond_2.svg"}
        width={80}
        height={80}
      />
    </div>
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
