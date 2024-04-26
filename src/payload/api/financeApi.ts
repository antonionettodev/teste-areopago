import axios from 'axios';

const baseURL = 'https://sandbox.asaas.com/api/v3';
const accessToken = process.env.ASAAS_SECRET;

export const getPixKeys = async(keyId = '') => {
  const options = {
    method: 'GET',
    url: `${baseURL}/pix/addressKeys/${keyId}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'access_token': accessToken,
    }
  }

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response : error);
    throw error;
  }
}

export const sendFinanceRequest = async (endpoint: string, method: string = 'GET', data?: object, headers?: object) => {
  const options = {
    method: method, 
    url: `${baseURL}/${endpoint}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'access_token': accessToken,
      ...headers 
    },
    data: data
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error; 
  }
}