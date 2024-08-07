// src/api.js

import mockData from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  const checkToken = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  };
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token'); //get the access token from local storage
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) { //if there is no access token or the token is invalid, get a new token
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {            //if there is no code, redirect to the authorization URL
      const response = await fetch(   
        "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT" //replace YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT with the actual endpoint
      );
      const result = await response.json();   //get the authorization URL
      const { authUrl } = result;
      return (window.location.href = authUrl);    //redirect to the authorization URL
    }
    return code && getToken(code);    //if there is a code, get the token
  }
  return accessToken;     
};