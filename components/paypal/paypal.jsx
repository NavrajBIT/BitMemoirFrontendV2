"use client";
import { useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";

const PayPalCheckout = ({ selectedPlan, getUserSubscription }) => {
	const api = API();
	useEffect(() => {
		// Replace with your PayPal client ID
		const CLIENT_ID =
			"AfsdQz11YJDeZo0QDj0DULPOEKnyNdomRV3TRTYLhh7z7656OQbUQCbbnr7qJQu2sXD7T1eMuFjaL25o";

		// Initialize PayPal script
		const script = document.createElement("script");
		// Initialize PayPal script with currency parameter
		script.src =
			"https://www.paypal.com/sdk/js?client-id=" +
			CLIENT_ID +
			"&currency=USD";

		script.async = true;

		script.onload = () => {
			// PayPal SDK has loaded; you can now use it
			window.paypal
				.Buttons({
					createOrder: (data, actions) => {
						// Set up the order details (amount, currency, etc.)
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: `${selectedPlan.totalPrice}`, // Replace with your product price
										currency_code: "USD",
									},
								},
							],
							application_context: {
								// Set return and cancel URLs
								return_url: "http://localhost:3000/", // Replace with your success URL
								cancel_url: "http://localhost:3000/", // Replace with your cancel URL
							},
						});
					},
					onApprove: (data, actions) => {
						// Capture the payment when the user approves
						return actions.order
							.capture()
							.then(async function (details) {
								// getting the user details
								const user = await api
									.crud("GET", "user/account")
									.then((res) => {
										console.log(res[0]);
										if (res.status === 200) {
											return res[0];
										}
									})
									.catch((err) => console.log(err));

								// checking if the payment is successfull
								const token = localStorage.getItem("jwtToken");

								const url =
									"http://localhost:8000/subscription/create-subscription/";
								const requestData = {
									payment_id: details.id,
									cert_number: selectedPlan.certificates,
									plan_name: selectedPlan.type,
									user: user,
								};

								const headers = {
									Authorization: `Bearer ${token}`,
									"Content-Type": "application/json",
								};

								const requestOptions = {
									method: "POST",
									headers: headers,
									body: JSON.stringify(requestData),
								};

								try {
									const response = await fetch(
										url,
										requestOptions
									);
									if (response.status == 201) {
										console.log(
											"Payment completed:",
											details
										);
										getUserSubscription();
									}
									console.log(response);
									setPaymentDone(true);
								} catch (error) {
									console.error("Error:", error);
								}
							});
					},
				})
				.render("#paypal-button-container");
		};

		// Append the script to the document
		document.body.appendChild(script);
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
			}}>
			<div id="paypal-button-container" style={{ width: "100%" }}></div>
		</div>
	);
};

export default PayPalCheckout;
