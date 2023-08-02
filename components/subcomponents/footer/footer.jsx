import React from "react";
import Link from "next/link";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import style from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <section className={style.footer}>
      <div className={style.footercontainer}>
        <div className={style.footerheading}>Reach out to us at</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-light)",
          }}
        >
          <Email email={"support@beimagine.tech"} />
          <Email email={"marketing@beimagine.tech"} />
          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: "bold",
            }}
          >
            Check out our social :
          </div>
          <div
            style={{
              display: "flex",
              gap: "var(--padding-main)",
            }}
          >
            <Link href={"https://twitter.com/"} className={style.sociallink}>
              <FaLinkedinIn />
            </Link>
            <Link href={"https://twitter.com/"} className={style.sociallink}>
              <FaInstagram />
            </Link>
            <Link href={"https://twitter.com/"} className={style.sociallink}>
              <AiOutlineTwitter />
            </Link>
            <Link href={"https://twitter.com/"} className={style.sociallink}>
              <BiLogoTelegram />
            </Link>
          </div>
        </div>
        <AddressBar />
      </div>
      <div style={{ textAlign: "center" }}>
        Copyright © 2022 Beyond Imagination Technologies Pvt. Ltd. All right
        reserved.
      </div>
    </section>
  );
};

export default Footer;

const Email = ({ email }) => (
  <Link
    href={`mailto:${email}`}
    target="_blank"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--padding-light)",
      fontSize: "1.25rem",
    }}
  >
    <AiOutlineMail /> {email}
  </Link>
);

const AddressBar = () => (
  <div>
    <Image
      src={"/assets/logo.png"}
      width={250}
      height={120}
      alt="Bwyond Imagination Technologies"
    />
    <div
      style={{
        fontWeight: "bold",
      }}
    >
      Address :
    </div>
    <div
      style={{
        fontSize: "0.875rem",
        marginTop: "0.5rem",
      }}
    >
      Beyond imagination tech LLC
      <br /> M03 Laffa restaurant building,
      <br />
      Sheikh Khalifa Bin Zayed St - Opp. Burjuman Mall,
      <br /> Dubai, United Arab Emirates
    </div>
  </div>
);
