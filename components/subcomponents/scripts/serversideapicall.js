const ServerAPI = () => {
  const API_URL = process.env.NEXT_API_ENDPOINT;

  async function crud(requestMethod, endpoint, data) {
    const requestOptions = {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
      cache: "no-store",
    };

    try {
      const response = await fetch(API_URL + endpoint + "/", requestOptions);

      if (response.status < 200 || response.status > 299) {
        throw response.status;
      }
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

  return { crud };
};

export default ServerAPI;
