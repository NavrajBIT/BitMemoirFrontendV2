import React from "react";
import Link from "next/link";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import style from "./footer.module.css";
import Image from "next/image";

const Footer = ({ params }) => {
  const ln = params?.ln ? params.ln : "en";
  return (
    <section className={style.footer}>
      <div className={style.footercontainer}>
        <div className={style.footerheading}>
          {ln === "en" && "Reach out to us at"}
          {ln === "es" && "Contactanos"}
          {ln === "ar" && "تواصل معنا على"}
        </div>
        <div className={style.footercontent}>
          <Email email={"support@beimagine.tech"} />
          <Email email={"marketing@beimagine.tech"} />
          <div className={style.socialheading}>
            {ln === "en" && "Check out our social:"}
            {ln === "es" && "Echa un vistazo a nuestras redes sociales:"}
            {ln === "ar" && "تحقق من الاجتماعية لدينا:"}
          </div>
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
        <AddressBar ln={ln} />
      </div>
      <div style={{ textAlign: "center" }}>
        {ln === "en" &&
          "Copyright © 2022 Beyond Imagination Technologies Pvt. Ltd. All rights  reserved."}
        {ln === "es" &&
          "Copyright © 2022 Más allá de la imaginación Technologies Pvt. Limitado. Ltd. Todos los derechos reservados."}
        {ln === "ar" &&
          "حقوق الطبع والنشر © 2022 Beyond Imagination Technologies Pvt. المحدودة. جميع الحقوق محفوظة."}
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

const AddressBar = ({ ln }) => (
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
      {ln === "en" && "Address:"}
      {ln === "es" && "DIRECCIÓN :"}
      {ln === "ar" && "عنوان :"}
    </div>
    <div
      style={{
        fontSize: "0.875rem",
      }}
    >
      Beyond imagination tech LLC
      <br />
      {ln === "en" && "M03 Laffa restaurant building,"}
      {ln === "es" && "M03 Edificio del restaurante Laffa,"}
      {ln === "ar" && "M03 مبنى مطعم لافا،"}
      <br />
      {ln === "en" && "Sheikh Khalifa Bin Zayed St - Opp. Burjuman Mall,"}
      {ln === "es" &&
        "Calle Sheikh Khalifa Bin Zayed - Opp. centro comercial burjuman,"}
      {ln === "ar" && "شارع الشيخ خليفة بن زايد - مقابل. برجمان مول،"}
      <br /> {ln === "en" && "Dubai, United Arab Emirates"}
      {ln === "es" && "Dubai, Emiratos Arabes Unidos"}
      {ln === "ar" && "دبى، الامارات العربية المتحدة"}
    </div>
  </div>
);
