const { useState, useEffect } = require("react");
import API from "../subcomponents/scripts/apiCall";


//Code not Refactored
const useSouvenirs = () => {
    const api = API();
	const [frameFile, setFrameFile] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [availableFrames, setAvailableFrames] = useState([{
		label: "---Select Frame---",
		value: "",
	},{
		label: "Add Frame",
		value: "addFrame",
	}]);
	const [selectedFrame, setSelectedFrame] = useState("");
	const [newFrameName, setNewFrameName] = useState(""); 
	const [newFrameFile, setNewFrameFile] = useState(null); 
	const [showAddFrameModal, setShowAddFrameModal] = useState(false); 
	const [isLoading, setIsLoading] = useState(false);
	const [souvenirDetails, setSouvenirDetails] = useState({
		image: null,
		name: "",
		email: "",
		wallet: "",
	});
    useEffect(() => {

        api.crud("GET", "certificate/frames").then((res) => {
			setAvailableFrames((prev) => {
				return [...prev, ...res];
			})
        }).catch((err) => console.log(err));3
        
	}, []);




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

	const handleAddFrame = () => {
		// Perform validation for the new frame inputs if needed
		if (newFrameName && newFrameFile) {

			

			api.crud("POST", "certificate/frames", {
				frame_name: newFrameName,
				frame_image: newFrameFile,
				user :3
			}).then((res) => {
				setAvailableFrames([...availableFrames, res]);
				setNewFrameName("");
				setNewFrameFile(null);
				setShowAddFrameModal(false);


			}).catch((err) => console.log(err));
		}
	};

	const handlePublishSouvenir = () => {
		console.log(souvenirDetails);
		console.log(uploadedImage)
		console.log(selectedFrame);
		//Conditions 
		if (true) {
			api.crud("POST", "certificate/mint-souvenir", {
				souvenir_name: souvenirDetails.name,
				frame_id: selectedFrame,
				email: souvenirDetails.email,
				wallet: souvenirDetails.wallet,
				souvenir_image: souvenirDetails.image,
			}).then((res) => {
				console.log(res);
				setSouvenirDetails({
					name: "",
					email: "",
					wallet: "",
					image: null,
				});
			}).catch((err) => console.log(err));
		}
	};


    return {
        frameFile,
        availableFrames,
        selectedFrame,
        newFrameName,
        newFrameFile,
        showAddFrameModal,
        handleFrameUpload,
        handleSelectFrame,
        handleNewFrameNameChange,
        handleNewFrameFileChange,
        handleAddFrame,
        handlePublishSouvenir,
		setShowAddFrameModal,
		setFrameFile,
		setNewFrameFile,
		souvenirDetails,
		setSouvenirDetails,
		isLoading,
		uploadedImage,
		setUploadedImage
    }

}

export default useSouvenirs;