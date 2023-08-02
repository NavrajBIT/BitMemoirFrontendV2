import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/";

const API = () => {
  const router = useRouter();
  const [jwtToken, setJwtToken] = useState(null);

  const poppulateJWT = () => {
    const token = localStorage.getItem("jwtToken");
    setJwtToken(token);
  };

  useEffect(() => {
    poppulateJWT();
  });

  async function crud(requestMethod, endpoint, data) {
    const requestOptions = {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(API_URL + endpoint, requestOptions);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("API call error:", error);
      throw error; // Rethrow the error for the calling code to handle
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
      const response = await fetch(API_URL + "user/register/", requestOptions);
      const responseData = await response.json();
      console.log(responseData);
      if (
        responseData.username[0] &&
        responseData.username[0] === "A user with that username already exists."
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
        return responseData;
      }
    } catch (error) {
      console.log("API call error:", error);
      throw error;
    }
  }

  async function refreshToken() {
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
      const response = await fetch(API_URL + "token/refresh/", requestOptions);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData["access"]) {
        localStorage.setItem("jwtToken", responseData.access);
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

  return { crud, createUser, jwtToken, getToken, refreshToken };
};

export default API;
