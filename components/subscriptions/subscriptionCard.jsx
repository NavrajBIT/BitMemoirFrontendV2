"use client";
import { useState } from "react";
import "./subscription.css";
import PayPalCheckout from "../paypal/paypal";
import Link from "next/link";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

const cardHead = {
	color: "white",
	position: "absolute",
	top: "-0.8rem",
	left: "1.5rem",
};

const SubscriptionCard = ({ plan, setSelectedPlan }) => {
	return (
		<div className="subscriptionCards">
			<h3 className="subscriptionCardHead" style={cardHead}>
				{plan.type}
			</h3>
			<div>
				<h1
					style={{
						color: "var(--primary-light)",
						fontSize: "3.5rem",
					}}
					className="certificates">
					{plan.certificates}
				</h1>
				<div
					style={{
						width: "100%",
						textAlign: "center",
					}}>
					Ceritificates
				</div>
			</div>
			<div className="priceInfo">{plan.price}$ / Ceritificates</div>
			<button
				className="subscriptionBtn"
				onClick={() => {
					setSelectedPlan(plan);
				}}>
				Buy Now
			</button>
		</div>
	);
};

export default SubscriptionCard;
