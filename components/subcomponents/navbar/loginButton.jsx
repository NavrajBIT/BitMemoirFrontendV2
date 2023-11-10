"use client";
import Link from "next/link";
import style from "./navbar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LoginButton = ({ onClick, ln }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const poppulateJWT = () => {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt && jwt !== null && jwt !== undefined && jwt !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    poppulateJWT();
  }, [pathname]);

  if (isLoggedIn) {
    return (
      <Link
        className={style.loginbutton}
        href={`/${ln}/dashboard`}
        onClick={onClick}
      >
        <Image
          src={"/icons/dashboard.svg"}
          height={20}
          width={20}
          alt="dashboard"
        />
        {ln === "en" && "Dashboard"}
        {ln === "es" && "Panel"}
        {ln === "ar" && "لوحة القيادة"}
      </Link>
    );
  }

  return (
    <Link className={style.loginbutton} href={`/${ln}/login`} onClick={onClick}>
      {ln === "en" && "Log In"}
      {ln === "es" && "Acceso"}
      {ln === "ar" && "تسجيل الدخول"}
    </Link>
  );
};

export default LoginButton;
