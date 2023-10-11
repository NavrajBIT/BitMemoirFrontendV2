const ServerAPI = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

  async function crud(requestMethod, endpoint, data) {
    const requestOptions = {
      method: requestMethod,
      body: data ? JSON.stringify(data) : null,
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
