import style from "../dashboard.module.css";
import Button from "@/components/subcomponents/button/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import t from "../translation";
import VerifyURL from "./verifyurl";
import Contract from "./contract";

const Heading = ({ usedash, ln }) => {
  const [isMenu, setIsMenu] = useState(false);

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
          {usedash.kycDetails.status !== "Approved" && (
            <span style={{ fontSize: "0.75rem", color: "red" }}>
              {t["KYC pending"][ln]}*
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Email: {userDetails.email}</div>
          <div>Phone: {userDetails.phone}</div>
          <div>Wallet: {userDetails.wallet}</div>
          <VerifyURL usedash={usedash} ln={ln} />
          <Contract usedash={usedash} ln={ln} />
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
        <div
          className={style.dotmenu}
          onClick={() => setIsMenu((prev) => !prev)}
          style={{
            background: isMenu ? "var(--primary-80)" : "var(--primary-90)",
          }}
        >
          {!isMenu ? (
            <Image
              src={"/icons/dot-menu.svg"}
              width={30}
              height={50}
              alt="menu"
            />
          ) : (
            "X"
          )}
        </div>
        {isMenu && <Menu ln={ln} />}
      </div>
    </div>
  );
};

export default Heading;

const Menu = ({ ln }) => {
  const router = useRouter();

  return (
    <div className={style.menuContainer}>
      <Button
        text="Logout"
        variant={"secondary"}
        onClick={() => {
          localStorage.setItem("jwtToken", null);
          router.push(`/${ln}/home`);
        }}
      />

      <Button
        text="Edit Profile"
        variant={"secondary"}
        onClick={() => {
          router.push(`/${ln}/kyc`);
        }}
      />
      <Button
        text="KYC Status"
        variant={"secondary"}
        onClick={() => {
          router.push(`/${ln}/kyc/status`);
        }}
      />
      <Button
        text="Change Password"
        variant={"secondary"}
        onClick={() => {
          router.push(`/${ln}/login/changePassword`);
        }}
      />
    </div>
  );
};
