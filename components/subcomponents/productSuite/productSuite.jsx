import Image from "next/image";
import "./productSuite.css";
const ProductSuite = () => {
	const products = [
		"Authentication and Verification",
		"Digital Credentials",
		"NFT as Souvenirs",
		"NFT Loyalty Programme",
		"Non Custodial Wallet",
		"Dynamic NFT's",
		"Unlock new and unique possibilities in the digital realm by enabling unique digital ownership and facilitating seamless transactions with enhanced provenance, scarcity, and programmability.",
		"Skills Passport",
		"NFT Utilitiy",
	];
	return (
		<section
			className="productSuiteContainer"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				position: "relative",
				marginBottom: "4rem",
			}}>
			<div
				className="productSuiteBackground"
				style={{
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center",
					mixBlendMode: "overlay",
					height: "100%",
					width: "100%",
					position: "absolute",
					top: "10%",
					left: "50%",
					transform: "translate(-50%)",
					zIndex: "-1",
					display: "flex",
					justifyContent: "center",
					margin: "auto",
					background: "url('/assets/images/background_4.svg')",
				}}>
				<Image
					src={"/assets/images/productSuiteBackgroundImage.png"}
					fill
					alt="productSuiteBackground"
					className="productSuiteBackgroundImage"
					style={{
						display: "none",
					}}
				/>
			</div>
			<div
				style={{
					marginTop: "8rem",
					fontSize: "1.5rem",
					fontWeight: "700",
					gridColumn: "1/4",
					gridRow: "1/2",
					textAlign: "center",
				}}>
				Product Suite
			</div>
			<div
				className="productSuiteDesktop"
				style={{ width: "100%", display: "none", gridRow: "2/3" }}>
				{products.slice(0, 3).map((product, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "var(--primary-100)",
								padding: "1.5rem",
								borderRadius: "0.5rem",
								width: "10rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								margin: "1.5rem auto",
								height: "8rem",
							}}>
							{product}
						</div>
					);
				})}
			</div>

			<div
				style={{
					backgroundColor: "var(--white-100)",
					width: "242px",
					height: "242px",
					borderRadius: "50%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gridRow: "2/3",
					margin: "auto",
				}}>
				<Image
					height={300}
					width={300}
					src={"/assets/images/productSuite.png"}
					alt="productSuite"
				/>
			</div>

			<div
				className="productSuiteDesktop"
				style={{
					maxWidth: "100%",
					display: "none",
					gridRow: "2/3",
				}}>
				{products.slice(3, 6).map((product, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "var(--primary-100)",
								padding: "1.5rem",
								borderRadius: "0.5rem",
								width: "10rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								margin: "1.5rem auto",
								height: "8rem",
							}}>
							{product}
						</div>
					);
				})}
			</div>
			<div
				className="productSuiteDesktopLower productSuiteDesktop"
				style={{
					maxWidth: "100%",
					display: "none",
					gridColumn: "1/4",
					gridRow: "3/4",
				}}>
				{products.slice(6, 9).map((product, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "var(--primary-100)",
								padding: "1.5rem",
								borderRadius: "0.5rem",
								width: "10rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								margin: "auto",
								height: "8rem",
							}}>
							{product}
						</div>
					);
				})}
			</div>
			<div
				className="productSuiteMobile"
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "1.5rem",
					justifyContent: "center",
					margin: "4rem 0",
				}}>
				{products.map((product, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "var(--primary-100)",
								padding: "1.5rem",
								borderRadius: "0.5rem",
								maxWidth: "40%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
							}}>
							{product}
						</div>
					);
				})}
			</div>
		</section>
	);
};
export default ProductSuite;
