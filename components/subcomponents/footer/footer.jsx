import React from "react";
import Link from "next/link";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import style from "./footer.module.css";

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
          <Email email={"support@beimagine.tech"} style={{fontSize:'1rem !important'}} />
          <Email email={"marketing@beimagine.tech"} className={style.mail} />
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              margin: '1rem 0 0.5rem'
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
            <Link href={"https://www.linkedin.com/company/bitmemoir/"} target="_blank" className={style.sociallink}>
              <FaLinkedinIn />
            </Link>
            <Link href={"https://www.instagram.com/bitmemoir/"} target="_blank" className={style.sociallink}>
              <FaInstagram />
            </Link>
            <Link href={"https://twitter.com/Bit_memoir?t=dPPpNawrSKg3mn3BLyYxWA&s=08"} target="_blank" className={style.sociallink}>
              <AiOutlineTwitter />
            </Link>
            <Link href={"https://t.me/bitmemoirofficial"} target="_blank" className={style.sociallink}>
              <BiLogoTelegram />
            </Link>
          </div>
        </div>
        <AddressBar />
      </div>
      <div style={{ textAlign: "center",fontSize:'0.9rem' }} className={style.copyright}>
        Copyright © 2022 Beyond Imagination Technologies Pvt. Ltd. All rights
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
className={style.email}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--padding-light)",
      fontSize: "1rem",
    }}
  >
    <AiOutlineMail /> {email}
  </Link>
);

const AddressBar = () => (
  <div className={style.footerLogo}>
    <Image
      src={"/assets/logo.png"}
      width={200}
      height={100}
      alt="Bwyond Imagination Technologies"
    />
    <div
      style={{
        fontWeight: "bold",
        margin:'2rem 0 0.5rem'
      }}
    >
      Address :
    </div>
    <div
      style={{
        fontSize: "0.8rem",
        marginTop: "0.5rem",
        lineHeight:'1.2rem'
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
