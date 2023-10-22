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
        <div className={style.footercontent}>
          <Email email={"support@beimagine.tech"} />
          <Email email={"marketing@beimagine.tech"} />
          <div className={style.socialheading}>Check out our social :</div>
          <div className={style.sociallinkcontainer}>
            <Link
              href={"https://www.linkedin.com/company/bitmemoir/"}
              target="_blank"
              className={style.sociallink}
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href={"https://www.instagram.com/bitmemoir/"}
              target="_blank"
              className={style.sociallink}
            >
              <FaInstagram />
            </Link>
            <Link
              href={
                "https://twitter.com/Bit_memoir?t=dPPpNawrSKg3mn3BLyYxWA&s=08"
              }
              target="_blank"
              className={style.sociallink}
            >
              <AiOutlineTwitter />
            </Link>
            <Link
              href={"https://t.me/bitmemoirofficial"}
              target="_blank"
              className={style.sociallink}
            >
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
      <div style={{ textAlign: "center" }}>
        Version: {process.env.NEXT_PUBLIC_VERSION}
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
      className={style.addressbar}
      style={{
        fontWeight: "bold",
      }}
    >
      Address :
    </div>
    <div
      style={{
        fontSize: "0.875rem",
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
