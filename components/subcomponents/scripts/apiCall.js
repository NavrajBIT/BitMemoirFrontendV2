import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const API = () => {
	const router = useRouter();

	async function crud(requestMethod, endpoint, data, isFormdata) {
		const token = localStorage.getItem("jwtToken");
		if (token === null || token === undefined) {
			router.push("/login");
			console.log(token);
			throw "Login required";
		}
		const requestOptions = isFormdata
			? {
					method: requestMethod,
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: data ? data : null,
			  }
			: {
					method: requestMethod,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: data ? JSON.stringify(data) : null,
			  };

		try {
			const response = await fetch(
				API_URL + endpoint + "/",
				requestOptions
			);
			if (response.status === 401) {
				router.push("/login");
				throw "Login required";
			}
			if (
				requestMethod === "DELETE" &&
				response.status >= 200 &&
				response.status <= 299
			) {
				// refreshToken();
				return true;
			}
			const responseData = await response.json();
			if (responseData["status"]) {
				responseData["modelStatus"] = responseData["status"];
			}
			responseData["status"] = response.status;
			// refreshToken();
			return responseData;
		} catch (error) {
			console.error("API call error:", error);
			throw error;
		}
	}

	async function certificate(certId) {
		const requestOptions = {
			method: "GET",
		};
		try {
			const response = await fetch(
				API_URL + `certificate/${certId}` + "/",
				requestOptions
			);

			const responseData = await response.json();
			if (responseData["status"]) {
				responseData["modelStatus"] = responseData["status"];
			}
			responseData["status"] = response.status;
			return responseData;
		} catch (error) {
			console.error("API call error:", error);
			throw error;
		}
	}

	async function blog(blogId) {
		let endpoint = `blog`;
		if (blogId) {
			endpoint = `blog/${blogId}`;
		}
		const requestOptions = {
			method: "GET",
		};
		try {
			const response = await fetch(
				API_URL + endpoint + "/",
				requestOptions
			);
			if (response.status === 404) return { status: 404 };

			const responseData = await response.json();
			if (responseData["status"]) {
				responseData["modelStatus"] = responseData["status"];
			}
			responseData["status"] = response.status;
			return responseData;
		} catch (error) {
			console.error("API call error:", error);
			throw error;
		}
	}
	async function nft(nftId) {
		let endpoint = `nft/${nftId}`;

		const requestOptions = {
			method: "GET",
		};
		try {
			const response = await fetch(
				API_URL + endpoint + "/",
				requestOptions
			);
			if (response.status === 404) return { status: 404 };

			const responseData = await response.json();
			if (responseData["status"]) {
				responseData["modelStatus"] = responseData["status"];
			}
			responseData["status"] = response.status;
			return responseData;
		} catch (error) {
			console.error("API call error:", error);
			throw error;
		}
	}

	async function createUser(data) {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : undefined,
		};

		try {
			const response = await fetch(
				API_URL + "user/register/",
				requestOptions
			);
			const responseData = await response.json();
			console.log(responseData);
			if (
				responseData.username[0] &&
				responseData.username[0] ===
					"A user with that username already exists."
			) {
				return { error: "Username is already taken." };
			} else {
				getToken(data);
				return responseData;
			}
		} catch (error) {
			console.log("API call error:", error);
			throw error;
		}
	}

	async function getToken(data) {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : undefined,
		};

		try {
			const response = await fetch(API_URL + "token/", requestOptions);
			const responseData = await response.json();

			if (
				responseData["detail"] &&
				responseData["detail"] ===
					"No active account found with the given credentials"
			) {
				return { error: "Invalid credentials." };
			} else {
				localStorage.setItem("jwtToken", responseData.access);
				localStorage.setItem("jwtRefresh", responseData.refresh);
				const currentTime = new Date().getTime();
				localStorage.setItem("lastRefresh", currentTime.toString());
				return responseData;
			}
		} catch (error) {
			console.log("API call error:", error);
			throw error;
		}
	}

	async function refreshToken() {
		const lastTime = localStorage.getItem("lastRefresh");

		if (lastTime) {
			const refreshTime = 90; // time in minutes
			const currentTime = new Date().getTime();
			const refreshTimeInMillis = refreshTime * 60 * 1000;
			const elapsedTime = currentTime - parseInt(lastTime);

			if (elapsedTime < refreshTimeInMillis) {
				return;
			}
		}

		const refreshKey = localStorage.getItem("jwtRefresh");
		const data = { refresh: refreshKey };

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : undefined,
		};

		try {
			const response = await fetch(
				API_URL + "token/refresh/",
				requestOptions
			);
			const responseData = await response.json();
			console.log(responseData);
			if (responseData["access"]) {
				localStorage.setItem("jwtToken", responseData.access);
				const currentTime = new Date().getTime();
				localStorage.setItem("lastRefresh", currentTime.toString());
				return true;
			} else {
				localStorage.setItem("jwtToken", null);
				localStorage.setItem("jwtRefresh", null);
				return false;
			}
		} catch (error) {
			console.log("API call error:", error);
			return false;
		}
	}

	async function socialLogin(accessToken, provider) {
		try {
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token: accessToken,
					provider: provider,
				}),
			};

			const response = await fetch(
				`${API_URL}user/auth/`,
				requestOptions
			);
			const responseData = await response.json();
			console.log(responseData);
			localStorage.setItem("jwtToken", responseData.token);

			return responseData;
		} catch (error) {
			console.log("API call error:", error);
			throw error;
		}
	}

	return {
		crud,
		createUser,
		getToken,
		refreshToken,
		socialLogin,
		certificate,
		blog,
		nft,
	};
};

export default API;
