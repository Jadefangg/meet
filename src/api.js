// src/api.js

import mockData from './mock-data';

/**
 * Extracts unique locations from events.
 * @param {Array} events - Array of event objects.
 * @returns {Array} - Array of unique locations.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Checks the validity of the access token.
 * @param {string} accessToken - The access token to check.
 * @returns {Object} - The result of the token check.
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 * Fetches events from the API.
 * @returns {Array} - Array of event objects.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  const removeQuery = () => {
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
    }
  };

  if (token) {
    removeQuery();
    const url = `https://up9fx890pb.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

/**
 * Fetches the access token using the authorization code.
 * @param {string} code - The authorization code.
 * @returns {string} - The access token.
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://up9fx890pb.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

/**
 * Retrieves the access token from local storage or fetches a new one.
 * @returns {string} - The access token.
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://up9fx890pb.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};