import Image from "next/image";
import Link from "next/link";
import Navmenu from "./navmenu";
import style from "./navbar.module.css";
import LoginButton from "./loginButton";
const Navbar = () => {
  const navMenuItems = [
    { name: "Certificates", route: "/mint" },
    { name: "Verify", route: "/verify" },
    { name: "Blog", route: "/blog" },
    { name: "About Us", route: "/about" },
  ];
  return (
    <nav className={style.navbar}>
      <Link href="/home">
        <Image height={80} width={140} src="/assets/logo.png" alt="BitMemoir" />
      </Link>
      <div className={style.navContainer}>
        {navMenuItems.map((item, index) => {
          return (
            <Link className={style.navbutton} href={item.route} key={index}>
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className={style.loginContainer}>
        <LoginButton />
      </div>
      <Navmenu />
    </nav>
  );
};

export default Navbar;
