"use client";
import useSouvenirs from "../usesouvenirs";

const AddFramePopup = ({setShowAddFrameModal}) => {

    const useSouvenirsScript = useSouvenirs();
	console.log(useSouvenirsScript.showAddFrameModal);
    
    return(
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
									value={useSouvenirsScript.newFrameName}
									onChange={useSouvenirsScript.handleNewFrameNameChange}
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
									onChange={useSouvenirsScript.handleNewFrameFileChange}
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
									onClick={(e) => useSouvenirsScript.handleAddFrame(e)}
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
    )
}

export default AddFramePopup;