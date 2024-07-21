//FINAL STEP AFTER EVERYTHING IS - serverless deploy <<<<<<<<<<<<
'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://Jadefangg.github.io/meet/" // Redirect URL for the OAuth consent screen.
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option. 
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

//getAccessToken function

module.exports.getAccessToken = async (event) => {
   // Decode authorization code extracted from the URL query
   const code = decodeURIComponent(`${event.pathParameters.code}`);

   return new Promise((resolve, reject) => {
     /**
      *  Exchange authorization code for access token with a “callback” after the exchange,
      *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
      */
 
     oAuth2Client.getToken(code, (error, response) => {
       if (error) {
         return reject(error);
       }
       return resolve(response);
     });
   })
     .then((results) => {
       // Respond with OAuth token 
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Credentials': true,
         },
         body: JSON.stringify(results),
       };
     })
     .catch((error) => {
       // Handle error
       return {
         statusCode: 500,
         body: JSON.stringify(error),
       };
     });
}

module.exports.getCalendarEvents = async (event) => { // 1 IS ASYNCHRONUS ,2 USING CORRECT NODE.JS EXPORT SYNTAX ,3 TAKES AN EVENT PARAMETER
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);//ACCESSTOKEN DECLARED HERE
  oAuth2Client.setCredentials({ access_token }); // 5 SETTING THE CREDENTIALS OF THE OAUTH2CLIENT TO THE ACCESS TOKEN

  return new Promise((resolve, reject) => { // 4 RETURNING A PROMISE IN WHICH WE WILL MAKE A REQUEST TO GOOGLE CALENDAR API
    calendar.events.list(
      { // 6 MAKING A REQUEST TO GOOGLE CALENDAR API TO GET THE EVENTS
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => { // 7 CALLBACK FUNCTION TO HANDLE THE RESPONSE
        calendar.events.list(
          {
            calendarId: CALENDAR_ID,
            auth: oAuth2Client,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
          },
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      }
    );
  })
    .then((results) => {
      // Respond with calendar events
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }), //NEW RETURN BODY.
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
  }