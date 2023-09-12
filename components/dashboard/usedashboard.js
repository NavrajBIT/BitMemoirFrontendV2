import { useState, useEffect } from "react";
import API from "../subcomponents/scripts/apiCall";

const usedashboard = () => {
	const api = API();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedTab, setSelectedTab] = useState("Profile");
	const [accountDetails, setAccountDetails] = useState(null);
	const [subscriptionDetails, setSubscriptionDetails] = useState(null);
	const [kycDetails, setKycDetails] = useState(null);
	const [emailDetails, setEmailDetails] = useState(null);
	const [organizationDetails, setOrganizationDetails] = useState(null);
	const [issuerDetails, setIssuerDetails] = useState(null);
	const [approversList, setApproversList] = useState(null);
	const [orders, setOrders] = useState(null);
	const [certificates, setCertificates] = useState(null);

	useEffect(() => {
		poppulateData();
	}, []);

	const poppulateData = async () => {
		setIsLoading(true);
		await poppulateAccountDetails();
		await poppulateEmailDetails();
		await poppulateOrganizationDetails();
		await poppulateIssuerDetails();
		await poppulateApprovers();
		await poppulateOrders();
		await poppulateCertificates();
		await poppulateKYCDetails();
		await poppulateSubscriptionDetails();
		setIsLoading(false);
	};

	const poppulateAccountDetails = async () => {
		await api
			.crud("GET", "user/account")
			.then((res) => {
				console.log(res[0]);
				if (res.status === 200) {
					setAccountDetails(res[0]);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateSubscriptionDetails = async () => {
		await api
			.crud("GET", "subscription/subscription-detail")
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setSubscriptionDetails(res);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateKYCDetails = async () => {
		await api
			.crud("GET", "user/kyc")
			.then((res) => {
				console.log(res[0]);
				if (res.status === 200) {
					setKycDetails(res[0]);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateEmailDetails = async () => {
		await api
			.crud("GET", "user/email")
			.then((res) => {
				console.log(res[0]);
				if (res.status === 200) {
					setEmailDetails(res[0]);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateOrganizationDetails = async () => {
		await api
			.crud("GET", "user/organization")
			.then((res) => {
				console.log(res[0]);
				if (res.status === 200) {
					setOrganizationDetails(res[0]);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateIssuerDetails = async () => {
		await api
			.crud("GET", "user/issuer")
			.then((res) => {
				console.log(res[0]);
				if (res.status === 200) {
					setIssuerDetails(res[0]);
				}
			})
			.catch((err) => console.log(err));
	};
	const poppulateApprovers = async () => {
		await api
			.crud("GET", "user/approver")
			.then((res) => {
				console.log(res);
				if (res.status >= 200 && res.status <= 299)
					setApproversList(res);
			})
			.catch((er) => console.log(er));
	};
	const poppulateOrders = async () => {
		await api
			.crud("GET", "certificate/order")
			.then((res) => {
				console.log(res);
				if (res.status >= 200 && res.status <= 299) setOrders(res);
			})
			.catch((er) => console.log(er));
	};
	const poppulateCertificates = async () => {
		await api
			.crud("GET", "certificate/all")
			.then((res) => {
				console.log(res);
				if (res.status >= 200 && res.status <= 299)
					setCertificates(res);
			})
			.catch((er) => console.log(er));
	};

	const deleteApprover = async (approver) => {
		setIsLoading(true);
		console.log(approver);
		await api
			.crud("DELETE", `user/approver/${approver.id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setIsLoading(false);
		poppulateApprovers();
	};

	return {
		isLoading,
		accountDetails,
		subscriptionDetails,
		kycDetails,
		emailDetails,
		organizationDetails,
		issuerDetails,
		approversList,
		deleteApprover,
		selectedTab,
		setSelectedTab,
		orders,
		certificates,
	};
};

export default usedashboard;
