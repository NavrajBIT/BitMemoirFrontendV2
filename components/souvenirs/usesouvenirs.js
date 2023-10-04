const { useState, useEffect } = require("react");
import API from "../subcomponents/scripts/apiCall";


//Code not Refactored
const useSouvenirs = () => {
    const api = API();
	const [frameFile, setFrameFile] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [successPopup, setSuccessPopup] = useState(false);
	const [availableFrames, setAvailableFrames] = useState([{
		label: "---Select Frame---",
		value: "",
	},{
		label: "Add Frame",
		value: "addFrame",
	}]);
	const [selectedFrame, setSelectedFrame] = useState("");
	const [newFrameName, setNewFrameName] = useState(""); 
	const [newFrameFile, setNewFrameFile] = useState(''); 
	const [showAddFrameModal, setShowAddFrameModal] = useState(false); 
	const [isLoading, setIsLoading] = useState(false);
	const [souvenirDetails, setSouvenirDetails] = useState({
		image: null,
		name: "",
		email: "",
		wallet: "",
	});
	const [loadingStatus, setLoadingStatus] = useState("");
    useEffect(() => {

        api.crud("GET", "certificate/frames").then((res) => {
			console.log(res);
			setAvailableFrames((prev) => {
				// return [...prev, ...res];
				let newDetails = [ ...prev ];

				for (let i = 0; i < res.length; i++) {
					newDetails.push({
						label: res[i].frame_name,
						value: res[i].id,
					});
				}
				// newDetails[key] = value;
				console.log(newDetails);
				return newDetails;
			});
        }).catch((err) => console.log(err));3
        
	}, []);




	const handleFrameUpload = (event) => {
		const file = event.target.files[0];
		console.log(file);
		console.log(file);
		if (file) {
			setFrameFile(file);
			setNewFrameFile(file)
			 // Store the frame file in state
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
		if (newFrameName && newFrameFile) {
			const formData = new FormData();
			formData.append("frame_name", newFrameName);
			formData.append("frame_image", newFrameFile);
			console.log(formData);
			api.crud("POST", "certificate/frames", formData,true).then((res) => {
				setAvailableFrames([...availableFrames, res]);
				setNewFrameName("");
				setNewFrameFile(null);
				setShowAddFrameModal(false);


			}).catch((err) => console.log(err));
		}
	};

	const handlePublishSouvenir = () => {
		setIsLoading(true);
		setLoadingStatus("Submitting Certificate Order...");
		console.log(loadingStatus)
		//Conditions 
		if (true) {
			const formData = new FormData();
			formData.append("souvenir_name", souvenirDetails.name);
			formData.append("frame_id",  selectedFrame);
			formData.append("email", souvenirDetails.email);
			formData.append("wallet", souvenirDetails.wallet);
			formData.append("souvenir_image", souvenirDetails.image);
			api.crud("POST", "certificate/mint-souvenir", formData,true).then((res) => {
				console.log(res);
				console.log(res.status);
				if(res.status >= 200 && res.status <= 299) {
					setLoadingStatus("");
					setSuccessPopup(true);
					setSouvenirDetails({
						name: "",
						email: "",
						wallet: "",
						image: null,
					});
				}
				else {
					setLoadingStatus("Error Occured");
				}
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
		setUploadedImage,
		successPopup,
		setSuccessPopup,
		loadingStatus,
		setLoadingStatus
    }

}

export default useSouvenirs;