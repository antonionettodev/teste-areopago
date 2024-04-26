import axios from "axios";
import { LatLng } from "../lib/interfaces";

const baseURL = 'https://maps.googleapis.com/maps/api'
const accessToken = process.env.GOOGLE_SECRET;

const requestOptions = (url: string): object => {
  return {
    method: 'GET',
    url: url,
    headers: {
      'content-type': 'application/json',
    },
  }
};

export const getLocalCoordinates = async (local: string) => {
  const geocodeURL = `${baseURL}/geocode/json?address=${local}&key=${accessToken}`;
  const options = requestOptions(geocodeURL);

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}

export const getLocalDistances = async (origin: LatLng, destination: LatLng) => {
  const distanceURL = `${baseURL}/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${accessToken}`;
  const options = requestOptions(distanceURL)

  try {
    const response = await axios.request(options)
    const distance = response.data.routes[0].legs[0].distance.value;
    return distance;
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    throw error;
  }
}