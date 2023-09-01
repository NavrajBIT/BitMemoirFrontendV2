"use client";

const { useState } = require("react");
import Image from "next/image";
import styles from './accordian.module.css';

const Accordian = ({ heading, text, index }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div key={index}>
			<div
				onClick={() => setIsActive((prev) => !prev)}
				style={{
					// padding: "1.5rem 2rem",
					padding: window.innerWidth < 450 ? "1.5rem 1rem" : "1.5rem 2rem",
					borderBottom: "2px solid  var(--primary-90)",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					cursor: "pointer",
				}}
				className={styles.accordianText}
			>
				{heading}
				<span
					style={{
						transform: isActive ? "rotate(180deg)" : "none",
						transition: "all 0.3s",
					}}>
					<Image
						src={"/icons/down-arrow.svg"}
						height={10}
						width={15}
						style={{ filter: 'invert(1)' }}
					/>
				</span>
			</div>
			<div
				style={{
					padding: isActive ?
						window.innerWidth < 450 ? "1.5rem 1rem" : "1.5rem 2rem"
						:
						window.innerWidth < 450 ? "0rem 1rem" : "0rem 2rem",

					backgroundColor: "var(--primary-90)",
					maxHeight: isActive ? "unset" : "0em",
					fontSize: "0.875rem",
					lineHeight: "2",
					overflow: "hidden",
					transition: "all 0.3s",
				}}
				className={styles.accordianText}
			>
				{text}
			</div>
		</div>
	);
};
export default Accordian;
