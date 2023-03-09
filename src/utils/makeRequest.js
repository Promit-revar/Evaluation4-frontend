/* eslint-disable */
import axios from 'axios';
import { BASE_URL } from '../constants/authEndpoints';
const makeRequest = async ({ url, method }, dynamicConfig={}) => {
  try {
    console.log(url,method)
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