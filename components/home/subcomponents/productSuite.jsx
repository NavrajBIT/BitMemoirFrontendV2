import Image from "next/image";
import style from "../home.module.css";

const products = [
  {
    title: "NFT Utility",
    description:
      "Unlock new and unique possibilities in the digital realm by enabling unique digital ownership and facilitating seamless transactions with enhanced provenance, scarcity, and programmability.",
  },
  {
    title: "NFT as Souvenirs",
    description:
      "A modern way to collect and preserve memories and create a lasting connection between the brands and its customers, allowing owning and commemorating unique moments, events, or experiences in a secure and verifiable way.",
  },
  {
    title: "Dynamic NFTs",
    description:
      "Bring interactivity and programmability to the world of digital collectibles. This initiative will enable NFTs to change, adapt, and respond to various conditions or inputs, thereby, offering a unique experience, creating new possibilities for engagement and creativity within the NFT ecosystem.",
  },
  {
    title: "Non Custodial wallet",
    description:
      "Owing to the increasing need of a NFT-friendly decentralised wallet, we present, BitWallet, which is both NFT and crypto friendly and with a super-simple UI/UX, will enhance the overall web3 experience for users.",
  },
  {
    title: "Digital Credentials",
    description:
      "A secure and verifiable way to represent and authenticate individuals qualifications, skills, and achievements.Offering digital credentials will offer convenience, efficiency, and trust, revolutionizing the way credentials are issued, shared, and verified.",
  },
  {
    title: "Authentication and Verification",
    description:
      "Negate the possibility of fake or fudged documents by verifying and authenticating the metadata of the digital documents using BitMemoir’s Verification service",
  },
  {
    title: "NFT Loyalty Programme",
    description:
      "A unique initiative that enables using Non-fungible tokens (NFTs) as loyalty/reward points and coupons to engage with the customers. These NFTs may either be redeemed for multiple rewards from brands or further transferred to family, friends or acquaintances as a gift, giving brands an increased customer base.",
  },
  {
    title: "Skills Passport",
    description:
      "An initiative towards creating a digital repository of verified documents and credentials for students,mapping their interests and skills, allowing them to create profiles that highlight their unique skill sets and experiences.",
  },
  {
    title: "Medical Passport",
    description:
      "An effort towards mapping the medical history, creating a repository of medical documents and making the tracking of past medical conditions and diagnosis easier, thus helping in correct medical diagnosis and advice.",
  },
];
const ProductSuite = () => {
  return (
    <section className={style.productSuiteContainer}>
      <div className={style.productSuite}>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            position: "absolute",
            top: "-1rem",
            left: "var(--padding-main)",
            color: "var(--primary-50)",
          }}
        >
          Product Suite
        </div>
        <DesktopFeatures />
        <MobileFeatures />
      </div>
    </section>
  );
};
export default ProductSuite;

const Illustration = () => (
  <div className={style.imageContainer}>
    <Image fill src={"/assets/images/productSuite.svg"} />
  </div>
);

const Feature = ({ index }) => (
  <div className={style.feature}>
    <div className={style.featureHeading}>{products[index]["title"]}</div>
    <div className={style.featureDescription}>
      {products[index]["description"]}
    </div>
  </div>
);

const DesktopFeatures = () => {
  return (
    <div className={style.desktopfeaturesContainer}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "var(--padding-main)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-main)",
          }}
        >
          <Feature index={1} />
          <Feature index={2} />
          <Feature index={3} />
        </div>
        <Illustration />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-main)",
          }}
        >
          <Feature index={4} />
          <Feature index={5} />
          <Feature index={6} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--padding-main)",
        }}
      >
        <Feature index={4} />
        <Feature index={5} />
        <Feature index={6} />
      </div>
    </div>
  );
};
const MobileFeatures = () => {
  return (
    <div className={style.mobilefeaturesContainer}>
      <Illustration />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "var(--padding-main)",
        }}
      >
        {products.map((_, index) => (
          <Feature index={index} key={"mobile-feature-" + index} />
        ))}
      </div>
    </div>
  );
};
