import React from "react";
import Link from "next/link";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
	return (
		<section
			className="footer"
			style={{
				backgroundColor: "var(--primary-100)",
				marginTop: "4rem",
				paddingBottom: "2rem",
				display: "block",
				gridTemplateColumns: "1fr auto",
			}}>
			<div
				className="footerHeading"
				style={{
					color: "var(--primary-50)",
					fontSize: "1.5rem",
					textAlign: "center",
					transform: "translateY(-50%)",
					fontWeight: "bold",
					gridColumn: "1/3",
				}}>
				Reach out to us at
			</div>
			<div
				style={{
					margin: "2rem",
					gridRow: "2/4",
				}}>
				<div
					style={{
						fontWeight: "bold",
						fontSize: "1.125rem",
					}}>
					Location :
				</div>
				<div
					className="footerLocation"
					style={{
						fontSize: "0.875rem",
						marginTop: "0.5rem",
					}}>
					Beyond imagination tech LLC
					<br /> M03 Laffa restaurant building,
					<br />
					Sheikh Khalifa Bin Zayed St - Opp. Burjuman Mall,
					<br /> Dubai, United Arab Emirates
				</div>
			</div>
			<div
				className="supportEmails"
				style={{
					fontSize: "1rem",
					margin: "2rem 2rem",
				}}>
				<Link
					href={"mailto:support@beimagine.tech"}
					target="_blank"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
					}}>
					<AiOutlineMail /> support@beimagine.tech
				</Link>
				<Link
					href={"mailto:marketing@beimagine.tech"}
					target="_blank"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
					}}>
					<AiOutlineMail /> marketing@beimagine.tech
				</Link>
			</div>
			<div
				style={{
					marginLeft: "2rem",
				}}>
				<div
					style={{
						fontSize: "1.125rem",
						fontWeight: "bold",
					}}>
					Check out our social :
				</div>
				<div
					className="socials"
					style={{
						display: "flex",
						gap: "1rem",
						marginTop: "0.5rem",
					}}>
					<Link
						href={"https://twitter.com/"}
						style={{
							fontSize: "1.8rem",
							backgroundColor: "var(--white-100)",
							color: "var(--black-100)",
							padding: "0.2rem",
							display: "flex",
							width: "min-content",
							borderRadius: "0.2rem",
						}}>
						<FaLinkedinIn />
					</Link>
					<Link
						href={"https://twitter.com/"}
						style={{
							fontSize: "1.8rem",
							backgroundColor: "var(--white-100)",
							color: "var(--black-100)",
							padding: "0.2rem",
							display: "flex",
							width: "min-content",
							borderRadius: "0.2rem",
						}}>
						<FaInstagram />
					</Link>
					<Link
						href={"https://twitter.com/"}
						style={{
							fontSize: "1.8rem",
							backgroundColor: "var(--white-100)",
							color: "var(--black-100)",
							padding: "0.2rem",
							display: "flex",
							width: "min-content",
							borderRadius: "0.2rem",
						}}>
						<AiOutlineTwitter />
					</Link>
					<Link
						href={"https://twitter.com/"}
						style={{
							fontSize: "1.8rem",
							backgroundColor: "var(--white-100)",
							color: "var(--black-100)",
							padding: "0.2rem",
							display: "flex",
							width: "min-content",
							borderRadius: "0.2rem",
						}}>
						<BiLogoTelegram />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Footer;
