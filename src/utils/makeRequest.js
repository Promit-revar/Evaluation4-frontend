import axios from 'axios';

const makeRequest = async ({ url, method }, BASE_URL, dynamicConfig = {}) => {
  try {
    console.log(url, method);
    const response = await axios({
      baseURL: BASE_URL,
      url,
      method,
      ...dynamicConfig,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default makeRequest;
