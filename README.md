**Meet** is a React-based app for discovering events, allowing users to explore upcoming events in various cities. It offers a smooth user experience with features like filtering events by city, toggling event details, and specifying the number of events displayed. The app supports offline access by caching event data and can be installed as a home screen shortcut. All of this data is also conviniently shown in the form of interactive charts - a scatter plot and a pie chart.

**Tech Stack:**
- Serverless
- Google Calendar API / AWS lambda
- React
- Jest
- Puppeteer
- Recharts

**Features:**

1. **Filter Events By City:**
   - **Default View:** Shows events from all cities if no city is searched.
   - **City Suggestions:** Provides city suggestions when typing in the search bar.
   - **Select City:** Displays events from the selected city.

2. **Show/Hide Event Details:**
   - **Default State:** Events are collapsed by default.
   - **Expand Event:** Clicking an event shows detailed information.
   - **Collapse Event:** Clicking again hides the details.

3. **Specify Number of Events:**
   - **Default Number:** Shows 32 events by default.
   - **Change Number:** Users can specify the number of events to display.

4. **Offline Access:**
   - **Cached Data:** Displays cached data when offline.
   - **Error Handling:** Shows an error if search settings are changed offline.

5. **Add App Shortcut:**
   - **Home Screen Shortcut:** Allows installation as a home screen shortcut.

6. **Display Charts:**
   - **Event Charts:** Shows charts with the number of upcoming events in each city.

**Development and Deployment:**
- **CI/CD Practices:** Utilizes CI/CD for continuous integration and delivery, with frequent automated tests and streamlined deployment.

- **React:** For building the UI.
- **Bootstrap:** For responsive design.
- **PWA Support:** For home screen installation.
- **Jest and Puppeteer:** For automated and end-to-end testing.


  **LIVE LINK**
  https://jadefangg.github.io/meet/

  **Installation & Setup**
 
Clone the repository:
git clone https://github.com/Jadefangg/meet
Navigate into the project directory:
cd meet
Run the app:
npm start
