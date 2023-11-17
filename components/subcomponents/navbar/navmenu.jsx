"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import style from "./navbar.module.css";
import LoginButton from "./loginButton";

const Navmenu = ({ ln }) => {
  const [isNavMenuActive, setIsNavMenuActive] = useState(false);
  const navMenuItems = [
    {
      name: { en: "Home", es: "Home", ar: "بيت" },
      route: `/${ln}/home`,
    },
    {
      name: { en: "Certificates", es: "Certificados", ar: "الشهادات" },
      route: `/${ln}/certificate`,
    },
    {
      name: { en: "Souvenirs", es: "Souvenirs", ar: "هدايا تذكارية" },
      route: `/${ln}/souvenir `,
    },
    {
      name: { en: "Verify", es: "Verificar", ar: "يؤكد" },
      route: `/${ln}/verify`,
    },
    { name: { en: "Blog", es: "Blog", ar: "مدونة" }, route: `/${ln}/blog` },
    {
      name: { en: "About Us", es: "Sobre nosotros", ar: "معلومات عنا" },
      route: `/${ln}/about`,
    },
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
                {item.name[ln]}
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
            <LoginButton ln={ln} onClick={() => setIsNavMenuActive(false)} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navmenu;
