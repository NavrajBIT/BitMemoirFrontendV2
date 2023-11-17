import Image from "next/image";
import Link from "next/link";
import Navmenu from "./navmenu";
import style from "./navbar.module.css";
import LoginButton from "./loginButton";
import LanguageSelector from "./languageSelector";
const Navbar = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  const navMenuItems = [
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
    <nav className={style.navbar}>
      <Link href={`/${ln}/home`}>
        <Image height={80} width={140} src="/assets/logo.png" alt="BitMemoir" />
      </Link>
      <div className={style.navContainer}>
        {navMenuItems.map((item, index) => {
          return (
            <Link className={style.navbutton} href={item.route} key={index}>
              {item.name[ln]}
            </Link>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--padding-light)",
        }}
      >
        <LanguageSelector />
        <div className={style.loginContainer}>
          <LoginButton ln={ln} />
        </div>
      </div>
      <Navmenu ln={ln} />
    </nav>
  );
};

export default Navbar;
