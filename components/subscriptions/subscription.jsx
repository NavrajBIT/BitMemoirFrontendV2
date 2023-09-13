"use client";
import { useState, useEffect } from "react";
import SubscriptionCard from "./subscriptionCard";
import "./subscription.css";
import PayPalCheckout from "../paypal/paypal";
import Link from "next/link";
import API from "../subcomponents/scripts/apiCall";

const containerStyle = {
	// border:'2px solid red',
	background: "#0F303E",
	height: "28rem",
	maxWidth: "65rem",
	width: "90%",
	display: "flex",
	flexWrap: "wrap",
	alignItems: "center",
	borderRadius: "8px",
	position: "relative",
	margin: "auto",
	paddingTop: "1rem",
};

const Subscription = () => {
	const [userSubscription, setUserSubscription] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const api = API();
	useEffect(() => {
		getUserSubscription();
	}, []);
	const getUserSubscription = async () => {
		await api
			.crud("GET", `subscription/subscription-detail`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setUserSubscription(res);
				}
			})
			.catch((err) => console.log(err));
	};
	const subscriptionData = [
		{ type: "Silver", certificates: 100, price: 2, totalPrice: "200" },
		{ type: "Gold", certificates: 1500, price: 1.75, totalPrice: "2625" },
		{
			type: "Platinum",
			certificates: 1000,
			price: 1.5,
			totalPrice: "1500",
		},
	];

	if (userSubscription) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<div>Already Subscribed</div>
				<Link
					href={"/dashboard"}
					style={{
						color: "var(--primary-60)",
						textDecoration: "underline",
					}}>
					See Details
				</Link>
			</div>
		);
	} else if (selectedPlan !== null) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "2rem",
				}}>
				<div
					style={{
						backgroundColor: "var(--primary-80)",
						display: "flex",
						flexDirection: "column",
						width: "40%",
						padding: "2rem",
						borderRadius: "0.5rem",
					}}>
					<PayPalCheckout
						selectedPlan={selectedPlan}
						getUserSubscription={getUserSubscription}
					/>
					<button
						onClick={() => {
							setSelectedPlan(null);
						}}
						style={{
							color: "var(--primary-50)",
							textDecoration: "underline",
							cursor: "pointer",
						}}>
						Change Plan
					</button>
				</div>
			</div>
		);
	} else
		return (
			<div
				style={{
					height: "80vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<div style={containerStyle} id="subscriptionContainer">
					<h1
						style={{
							color: "var(--primary-light)",
							position: "absolute",
							top: 0,
							left: "50%",
							transform: "translate(-50%,-50%)",
						}}
						className="subscriptionHead">
						Subscription Plans
					</h1>
					<div id="subscriptionCardsDiv">
						{subscriptionData.map((plan) => {
							return (
								<SubscriptionCard
									plan={plan}
									setSelectedPlan={setSelectedPlan}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
};

export default Subscription;
