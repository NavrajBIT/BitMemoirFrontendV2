"use client";
import Link from "next/link";
import style from "./navbar.module.css";
import API from "../scripts/apiCall";
import Image from "next/image";

const LoginButton = ({ onClick }) => {
  const api = API();

  if (api.jwtToken !== null) {
    return (
      <Link className={style.loginbutton} href="/dashboard" onClick={onClick}>
        <Image
          src={"/icons/dashboard.svg"}
          height={20}
          width={20}
          alt="dashboard"
        />
        Dashboard
      </Link>
    );
  }

  return (
    <Link className={style.loginbutton} href="/login" onClick={onClick}>
      Log In
    </Link>
  );
};

export default LoginButton;
