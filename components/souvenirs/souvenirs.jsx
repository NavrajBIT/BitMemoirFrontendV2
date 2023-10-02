"use client";
import { useState, useEffect } from "react";
import Form from "../subcomponents/form/form";
import DynamicForm from "../subcomponents/form/dynamicForm";
import "./souvenirs.css";
import useSouvenirs from "./usesouvenirs";

const Souvenirs = () => {

	const useSouvenirsScript = useSouvenirs();

	const handleChange=(key,value)=>{
		console.log(key,value);
		useSouvenirsScript.setSouvenirDetails((prev) => {
			let newDetails = { ...prev };
			newDetails[key] = value;
			return newDetails;
		  });
	}

	const formData = [
		{
			label: "Image",
			type: "file",
			value: useSouvenirsScript.uploadedImage,
			setValue: (event) => {
				handleChange("image",event.target.files[0]);
			}
		},
		{
			label: "Select Frame",
			type: "select",
			value: useSouvenirsScript.selectedFrame,
			options: useSouvenirsScript.availableFrames,
			setValue: (event) => {
				handleChange("frame",event.target.value);
			}
		},
		{
			label: "Souvenirs Name",
			type: "text",
			value: useSouvenirsScript.souvenirDetails.name,
			setValue: (event) => {
				handleChange("name",event.target.value);
			}
		},
		{
			label: "Email Address",
			type: "email",
			value: useSouvenirsScript.souvenirDetails.email,
			setValue: (event) => {
				handleChange("email",event.target.value);
			}
		},
		{
			label: "Wallet Address",
			type: "text",
			value: useSouvenirsScript.souvenirDetails.wallet,
			setValue: (event) => {
				handleChange("wallet",event.target.value);
			}
		},

	]
	


	return (
		<div
			style={{
				// height: '80vh',
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>

			<DynamicForm
				formTitle="Souvenirs"
				formButton="Publish"
				isLoading={useSouvenirsScript.isLoading}
				handleSubmit={useSouvenirsScript.handlePublishSouvenir}
				formData={formData}
			>
			</DynamicForm>
		</div>
	);
};

export default Souvenirs;
