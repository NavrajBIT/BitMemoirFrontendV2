import style from "../dashboard.module.css";
import Button from "@/components/subcomponents/button/button";
import { useRouter } from "next/navigation";

const Heading = ({ usedash }) => {
  const router = useRouter();
  const userDetails = {
    name: `${
      usedash.accountDetails.first_name
        ? usedash.accountDetails.first_name
        : "Anonymous"
    } ${usedash.accountDetails.last_name && usedash.accountDetails.last_name}`,
    email: usedash.emailDetails.email && usedash.emailDetails.email,
    phone: usedash.accountDetails.phone && usedash.accountDetails.phone,
    wallet: usedash.accountDetails.wallet && usedash.accountDetails.wallet,
  };
  return (
    <div className={style.sectionContainer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "1.5rem", color: "var(--text-bright)" }}>
          {userDetails.name}
          {usedash.issuerDetails.status !== "Approved" && (
            <span style={{ fontSize: "0.75rem", color: "red" }}>
              KYC pending*{" "}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Email: {userDetails.email}</div>
          <div>Phone: {userDetails.phone}</div>
          <div>Wallet: {userDetails.wallet}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "var(--padding-light)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "fit-content" }}>
          <Button
            text="Logout"
            variant={"secondary"}
            onClick={() => {
              localStorage.setItem("jwtToken", null);
              router.push("/home");
            }}
          />
        </div>
        <div style={{ width: "fit-content" }}>
          <Button
            text="Edit Profile"
            variant={"secondary"}
            startIcon={"edit"}
            onClick={() => {
              localStorage.setItem("jwtToken", null);
              router.push("/kyc");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Heading;
