import style from "./error.module.css";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  const navMenuItems = [
    { name: "Home", route: "/home" },
    { name: "Certificates", route: "/certificate" },
    { name: "Verify", route: "/verify" },
    { name: "Blog", route: "/blog" },
    { name: "About Us", route: "/about" },
  ];

  return (
    <div className={style.notFoundContainer}>
      <Image
        src={"/assets/logo.png"}
        width={200}
        height={100}
        alt="Beyond Imagination Technologies"
      />
      <div className={style.error}>Error: 404 | PAGE NOT FOUND</div>
      {navMenuItems.map((item, index) => {
        return (
          <Link className={style.link} href={item.route} key={index}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NotFound;
