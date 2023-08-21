"use client";
import Link from "next/link";
import style from "./navbar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LoginButton = ({ onClick }) => {
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
