"use client";

import Button from "../button/button";
import { useRouter } from "next/navigation";

const LoginButton = () => {
	const router = useRouter();
	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				gap: "1em",
				justifyContent: "center",
			}}>
			<Button
				text={"Sign Up"}
				style={{
					color: "var(--white-100)",
					fontSize: "1.25rem",
					padding: "0.5em 1.2em",
					border: "1px solid var(--primary-60)",
					borderRadius: "0.3em",
					cursor: "pointer",
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
					cursor: "pointer",
				}}
			/>
		</div>
	);
};

export default LoginButton;
