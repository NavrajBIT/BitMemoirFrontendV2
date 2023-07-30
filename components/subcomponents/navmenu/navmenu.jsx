"use client";
// next
import Image from "next/image";
import Link from "next/link";

// react
import { useState } from "react";

// components
import LoginButton from "../navbar/loginButton";
import Button from "@/components/subcomponents/button/button";

const Navmenu = () => {
	const [isNavMenuActive, setIsNavMenuActive] = useState(false);
	const navMenuItems = [
		{ name: "Certificates", route: "/certificate" },
		{ name: "NFT", route: "/view" },
		{ name: "Souvenirs", route: "/verify" },
		{ name: "Blog", route: "/blog" },
		{ name: "About Us", route: "/about" },
		{ name: "Profile", route: "/profile" },
	];
	return (
		<div>
			<Image
				height={20}
				width={20}
				src="/icons/menu.svg"
				alt="menu"
				style={{
					transform: isNavMenuActive ? "rotate(90deg)" : "none",
					transition: "all 0.3s",
				}}
				onClick={() => setIsNavMenuActive((prev) => !prev)}
			/>
			<nav
				style={{
					backgroundColor: `var(--primary-100)`,
					border: "solid var(--primary-60)",
					borderWidth: isNavMenuActive ? "1px" : "0px",
					borderRadius: "0.6em",
					display: "flex",
					flexDirection: "column",
					maxHeight: isNavMenuActive ? "35em" : "0em",
					overflow: "hidden",
					transition: "all 0.5s",
					padding: "0em",
					paddingBottom: "0em",
					position: "absolute",
					left: "50%",
					width: "90%",
					top: "12%",
					transform: "translateX(-50%)",
				}}>
				{navMenuItems.map((item, index) => {
					return (
						<Link
							className="link"
							href={item.route}
							key={index}
							style={{
								fontSize: "1.25rem",
								borderBottom: "1px solid var(--primary-80)",
								padding: "1em",
								margin: "0.25em",
							}}>
							{item.name}
						</Link>
					);
				})}

				<div
					style={{
						alignItems: "center",
						display: "flex",
						gap: "1em",
						justifyContent: "center",
						margin: "2em 1em",
					}}>
					<Button
						text={"Sign Up"}
						style={{
							color: "var(--white-100)",
							fontSize: "1.25rem",
							padding: "0.5em 1.2em",
							border: "1px solid var(--primary-60)",
							borderRadius: "0.3em",
						}}
					/>
					<Button
						text={"Get Wallet"}
						style={{
							color: "var(--white-100)",
							fontSize: "1.25rem",
							padding: "0.5em 1em",
							border: "1px solid var(--primary-60)",
							borderRadius: "0.3em",
							backgroundColor: "var(--primary-60)",
						}}
					/>
				</div>
			</nav>
		</div>
	);
};

export default Navmenu;
