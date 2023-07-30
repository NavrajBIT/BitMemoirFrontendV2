import Image from "next/image";
import Link from "next/link";
import LoginButton from "./loginButton";
import Navmenu from "../navmenu/navmenu";
import "./navbar.css";
const Navbar = () => {
	const navMenuItems = [
		{ name: "Certificates", route: "/mint" },
		{ name: "NFT", route: "/view" },
		{ name: "Souvenirs", route: "/verify" },
		{ name: "Blog", route: "/blog" },
		{ name: "About Us", route: "/about" },
	];
	return (
		<nav
			style={{
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "4rem 2rem",
				gap: "2rem",
			}}>
			<Link href="/home">
				<Image
					height={23}
					width={114}
					src="/assets/bitmemoirlogo.png"
					alt="BitMemoir"
				/>
			</Link>
			<div
				className="navitems"
				style={{
					display: "none",
					gap: "2rem",
					alignItems: "center",
				}}>
				{navMenuItems.map((item, index) => {
					return (
						<Link
							className="link"
							href={item.route}
							key={index}
							style={{
								background:
									"linear-gradient(to bottom, var(--primary-110), var(--primary-100))",
								padding: "0.5rem",
								borderRadius: "0.2rem",
							}}>
							{item.name}
						</Link>
					);
				})}
				<LoginButton />
			</div>
			<span className="navmenu">
				<Navmenu />
			</span>
		</nav>
	);
};

export default Navbar;
