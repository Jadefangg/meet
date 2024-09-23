// src/api.js

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  CHANGE ALL PLACEHOLDERS  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
  return locations; //return the array of unique locations mapped from the events array which was passed as an argument.
};

/**
 *
 * This function will fetch the list of all events
 */

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}` //this is the endpoint to check the token
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  const removeQuery = () => { //this function will remove all query parameters from the URL.
    let newurl;
    if (window.history.pushState && window.location.pathname) {
      newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }}

  if (token) {
    removeQuery(); 
    const url =  "YOUR_GET_EVENTS_API_ENDPOINT" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null; 
  }
};
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
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
        "https://up9fx890pb.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url" //replace YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT with the actual endpoint
      );
      const result = await response.json();   //get the authorization URL
      const { authUrl } = result;
      return (window.location.href = authUrl);    //redirect to the authorization URL
    }
    return code && getToken(code);    //if there is a code, get the token
  }
  return accessToken;     //if there is a token, return it
};