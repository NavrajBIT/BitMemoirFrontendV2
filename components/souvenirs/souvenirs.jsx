"use client";
import { useState, useEffect } from "react";
import Form from "../subcomponents/form/form";
import "./souvenirs.css";

const Souvenirs = () => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [frameFile, setFrameFile] = useState(null);
	const [availableFrames, setAvailableFrames] = useState([]);
	const [selectedFrame, setSelectedFrame] = useState("");
	const [newFrameName, setNewFrameName] = useState(""); // State for storing the new frame name
	const [newFrameFile, setNewFrameFile] = useState(null); // State for storing the new frame file
	const [showAddFrameModal, setShowAddFrameModal] = useState(false); // State for showing/hiding the modal
	const [souvenirName, setSouvenirName] = useState(""); // State for souvenir name
	const [emailAddress, setEmailAddress] = useState(""); // State for email address
	const [walletAddress, setWalletAddress] = useState(""); // State for wallet address

	useEffect(() => {
		// Fetch available frames from the server
		const headers = new Headers();
		headers.append("Authorization", `Bearer ${getJwtToken()}`);
		fetch("http://127.0.0.1:8000/certificate/frames/", {
			method: "GET",
			headers: headers,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAvailableFrames(data); // Assuming the server responds with a JSON object containing an array of frame names
			})
			.catch((error) => {
				console.error("Error fetching available frames:", error);
			});
	}, []);

	const souvenirsFormData = [
		{
			label: "Souvenirs Name",
			type: "text",
			value: souvenirName,
			onChange: (event) => setSouvenirName(event.target.value),
		},
		{
			label: "Email Address",
			type: "text",
			value: emailAddress,
			onChange: (event) => setEmailAddress(event.target.value),
		},
		{
			label: "Wallet Address",
			type: "text",
			value: walletAddress,
			onChange: (event) => setWalletAddress(event.target.value),
		},
	];

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			setUploadedImage(file);
		}
	};

	const handleFrameUpload = (event) => {
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			setFrameFile(file); // Store the frame file in state
		}
	};

	const handleSelectFrame = (event) => {
		const selectedValue = event.target.value;
		setSelectedFrame(selectedValue);

		// If "addFrame" is selected, show the modal
		if (selectedValue === "addFrame") {
			setShowAddFrameModal(true);
		}
	};

	const handleNewFrameNameChange = (event) => {
		setNewFrameName(event.target.value);
	};

	const handleNewFrameFileChange = (event) => {
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			setNewFrameFile(file);
		}
	};

	const getJwtToken = () => {
		return localStorage.getItem("jwtToken");
	};

	const handleAddFrame = (e) => {
		e.preventDefault();
		// Perform validation for the new frame inputs if needed
		if (newFrameName && newFrameFile) {
			// Create a FormData object to send the frame data
			const formData = new FormData();
			formData.append("frame_name", newFrameName);
			formData.append("frame_image", newFrameFile);

			// Create headers and add JWT token
			const headers = new Headers();
			headers.append("Authorization", `Bearer ${getJwtToken()}`);

			// Send a fetch request to upload the frame with headers
			fetch("http://127.0.0.1:8000/certificate/frames/", {
				method: "POST",
				body: formData,
				headers: headers,
			})
				.then((response) => response.json())
				.then((data) => {
					// Handle the response from the server, e.g., display a success message
					console.log("Frame uploaded successfully:", data);

					// Fetch the updated list of available frames
					fetchAvailableFrames();

					// Clear the form fields
					setNewFrameName("");
					setNewFrameFile(null);

					setShowAddFrameModal(false); // Close the modal
				})
				.catch((error) => {
					// Handle errors, e.g., display an error message
					console.error("Error uploading frame:", error);
				});
		}
	};

	const handlePublishSouvenir = (e) => {
		e.preventDefault();
		// Perform validation for the souvenir inputs if needed
		if (souvenirName && (emailAddress || walletAddress) && selectedFrame) {
			// Create a FormData object to send the souvenir data
			const formData = new FormData();
			formData.append("souvenir_name", souvenirName);
			formData.append("frame_id", selectedFrame);
			formData.append("email", emailAddress || "");
			formData.append("wallet", walletAddress || "");
			formData.append("souvenir_image", uploadedImage || "");

			// Create headers and add JWT token
			const headers = new Headers();
			headers.append("Authorization", `Bearer ${getJwtToken()}`);

			// const rawData = {
			// 	souvenir_name: souvenirName,
			// 	frame_id: selectedFrame,
			// 	email: emailAddress || "",
			// 	wallet: walletAddress || "",
			// 	souvenir_image: uploadedImage,
			// };

			// Send a fetch request to publish the souvenir with headers
			fetch("http://127.0.0.1:8000/certificate/mint-souvenir/", {
				method: "POST",
				body: formData,
				headers: headers,
			})
				.then((response) => response.json())
				.then((data) => {
					// Handle the response from the server, e.g., display a success message
					console.log("Souvenir published successfully:", data);

					// Clear the form fields
					setSouvenirName("");
					setEmailAddress("");
					setWalletAddress("");
					setUploadedImage(null);

					// Optionally, you can perform additional actions after publishing
				})
				.catch((error) => {
					// Handle errors, e.g., display an error message
					console.error("Error publishing souvenir:", error);
				});
		}
	};

	return (
		<div
			style={{
				// height: '80vh',
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<div
				style={{
					// border:'2px solid red',
					background: "#0F303E",
					height: "50rem",
					maxWidth: "35rem",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "8px",
					position: "relative",
				}}
				id="formContainer">
				<h1
					style={{
						color: "var(--primary-light)",
						position: "absolute",
						top: "-1rem",
						left: "3rem",
					}}
					className="formHead">
					Souvenirs
				</h1>
				<div
					style={{
						height: "20rem",
						width: "90%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "flex-end",
						padding: "1.5rem",
					}}
					id="uploadImgDiv">
					{uploadedImage ? (
						<img
							src={uploadedImage}
							alt=""
							style={{ margin: "2rem 0" }}
						/>
					) : (
						<img
							src="/souvenirs/uploadImg.png"
							alt=""
							style={{ margin: "2rem 0" }}
						/>
					)}
					<label
						htmlFor="img"
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
						id="uploadCertLabel">
						Click to upload certificate
						<input
							type="file"
							id="img"
							name="img"
							accept="image/*"
							style={{ display: "none" }}
							onChange={handleImageUpload}
						/>
					</label>
					<div style={{ margin: "8px 0" }} className="drag">
						OR
					</div>
					<div className="drag">Drag and drop image to upload</div>
				</div>

				<label
					htmlFor="selectFrame"
					style={{
						fontSize: "12px",
						textAlign: "start",
						margin: "1.5rem 0 0",
						color: "#99ABAF",
					}}>
					Souvenirs Frame
				</label>
				<select
					id="selectFrame"
					name="selectFrame"
					onChange={handleSelectFrame}
					value={selectedFrame}>
					<option value="">Select Frame</option>
					{availableFrames &&
						availableFrames.map((frame) => (
							<option key={frame.id} value={frame.id}>
								{frame.frame_name}
							</option>
						))}
					<option value="addFrame">Add Frame</option>
				</select>

				{/* Add Frame Modal */}
				{showAddFrameModal && (
					<div
						style={{
							position: "fixed",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							background: "rgba(0, 0, 0, 0.5)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							zIndex: 999,
						}}>
						<div
							style={{
								background: "var(--primary-70)",
								padding: "2rem",
								borderRadius: "8px",
								width: "400px",
							}}>
							<h2>Add New Frame</h2>
							<div
								style={{
									display: "flex",
									marginTop: "1rem",
								}}>
								<label htmlFor="newFrameName">
									Frame Name:
								</label>
								<input
									type="text"
									id="newFrameName"
									name="newFrameName"
									value={newFrameName}
									onChange={handleNewFrameNameChange}
									style={{
										backgroundColor: "var(--primary-100)",
										padding: "0.5rem",
										border: "none",
										outline: "none",
										width: "100%",
										color: "white",
									}}
								/>
							</div>
							<div
								style={{
									display: "flex",
									marginTop: "0.5rem",
								}}>
								<label htmlFor="newFrameFile">
									Upload Frame:
								</label>
								<input
									type="file"
									id="newFrameFile"
									name="newFrameFile"
									accept="image/*"
									onChange={handleNewFrameFileChange}
								/>
							</div>
							<div
								style={{
									display: "flex",
									gap: "1rem",
									width: "100%",
									marginTop: "1rem",
								}}>
								<button
									onClick={(e) => handleAddFrame(e)}
									style={{
										padding: "1rem 2rem",
										backgroundColor: "var(--primary-50)",
										color: "white",
										width: "100%",
									}}>
									Add Frame
								</button>
								<button
									style={{
										padding: "1rem 2rem",
										backgroundColor: "var(--primary-50)",
										color: "white",
										width: "100%",
									}}
									onClick={() => setShowAddFrameModal(false)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				<form onSubmit={(e) => handlePublishSouvenir(e)}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							fontSize: "0.8rem",
						}}>
						<label
							htmlFor="souvenir_name"
							style={{
								opacity: souvenirName === "" ? 0 : 1,
								transition: "all",
							}}>
							Souvenir Name
						</label>
						<input
							type="text"
							value={souvenirName}
							onChange={(e) => setSouvenirName(e.target.value)}
							placeholder="Souvenir Name"
							style={{
								padding: "1rem",
								backgroundColor: "var(--primary-70)",
								color: "white",
								fontSize: "1rem",
								border: "none",
								outline: "none",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							fontSize: "0.8rem",
							marginTop: "0.5rem",
						}}>
						<label
							htmlFor="email_address"
							style={{
								opacity: emailAddress === "" ? 0 : 1,
								transition: "all",
							}}>
							Email Address
						</label>
						<input
							type="text"
							id="email_address"
							value={emailAddress}
							onChange={(e) => setEmailAddress(e.target.value)}
							placeholder="Email Address"
							style={{
								padding: "1rem",
								backgroundColor: "var(--primary-70)",
								color: "white",
								fontSize: "1rem",
								border: "none",
								outline: "none",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							fontSize: "0.8rem",
							marginTop: "0.5rem",
						}}>
						<label
							htmlFor="wallet_address"
							style={{
								opacity: walletAddress === "" ? 0 : 1,
								transition: "all",
							}}>
							Wallet Address
						</label>
						<input
							type="text"
							id="wallet_address"
							value={walletAddress}
							onChange={(e) => setWalletAddress(e.target.value)}
							placeholder="Wallet Address"
							style={{
								padding: "1rem",
								backgroundColor: "var(--primary-70)",
								color: "white",
								fontSize: "1rem",
								border: "none",
								outline: "none",
							}}
						/>
					</div>
					<button
						type="submit"
						style={{
							padding: "1rem 2rem",
							backgroundColor: "var(--primary-50)",
							color: "white",
							width: "100%",
							marginTop: "1.5rem",
						}}>
						Publish
					</button>
				</form>
			</div>
		</div>
	);
};

export default Souvenirs;
