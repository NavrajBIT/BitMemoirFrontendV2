"use client";
const { useState } = require("react");
import Image from "next/image";

const Accordian = ({ heading, text, index }) => {
	const [isActive, setIsActive] = useState(false);
	return (
		<div key={index}>
			<div
				onClick={() => setIsActive((prev) => !prev)}
				style={{
					padding: "1.5rem 2rem",
					borderBottom: "2px solid  var(--primary-90)",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					cursor: "pointer",
				}}>
				{heading}
				<span
					style={{
						transform: isActive ? "rotate(180deg)" : "none",
						transition: "all 0.3s",
					}}>
					<Image
						src={"/icons/down_arrow.svg"}
						height={10}
						width={15}
					/>
				</span>
			</div>
			<div
				style={{
					padding: isActive ? "1.5rem 2rem" : "0em 2rem",
					backgroundColor: "var(--primary-90)",
					maxHeight: isActive ? "15em" : "0em",
					fontSize: "0.875rem",
					lineHeight: "2",
					overflow: "hidden",
					transition: "all 0.3s",
				}}>
				{text}
			</div>
		</div>
	);
};
export default Accordian;
