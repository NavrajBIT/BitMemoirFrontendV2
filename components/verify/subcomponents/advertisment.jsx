import style from "../certificate.module.css";
import Button from "@/components/subcomponents/button/button";
import { useRouter } from "next/navigation";
const Advertisment = () => {
  const router = useRouter();
  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          color: "var(--primary-50)",
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Issue your own verified certificate as NFT
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          maxWidth: "var(--max-width-form)",
          textAlign: "center",
        }}
      >
        You can issue certifications as NFTs and send them to virtual wallets,
        verifying their validity using blockchain technology
      </div>
      <div style={{ width: "fit-content" }}>
        <Button
          variant="primary"
          text="Try For Free"
          onClick={() => router.push("/trial")}
        />
      </div>
    </div>
  );
};

export default Advertisment;
