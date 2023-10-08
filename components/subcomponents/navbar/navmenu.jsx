"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import style from "./navbar.module.css";
import LoginButton from "./loginButton";

const Navmenu = () => {
  const [isNavMenuActive, setIsNavMenuActive] = useState(false);
  const navMenuItems = [
    { name: "Home", route: "/home" },
    { name: "Souvenirs", route: "/souvenir" },
    { name: "Certificates", route: "/certificate" },
    { name: "Verify", route: "/verify" },
    { name: "Blog", route: "/blog" },
    { name: "About Us", route: "/about" },
  ];
  return (
    <div className={style.menuContainer}>
      <Image
        height={30}
        width={30}
        src="/icons/menu.svg"
        alt="menu"
        style={{
          transform: isNavMenuActive ? "rotate(90deg)" : "none",
          transition: "all 0.3s",
        }}
        onClick={() => setIsNavMenuActive((prev) => !prev)}
      />
      {isNavMenuActive && (
        <nav className={style.navmenu}>
          {navMenuItems.map((item, index) => {
            return (
              <Link
                className="link"
                href={item.route}
                key={index}
                onClick={() => setIsNavMenuActive(false)}
                style={{
                  fontSize: "1.25rem",
                  borderBottom: "1px solid var(--primary-80)",
                  padding: "var(--padding-main) 0",
                }}
              >
                {item.name}
              </Link>
            );
          })}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoginButton onClick={() => setIsNavMenuActive(false)} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navmenu;
