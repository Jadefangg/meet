// src/App.js

import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';
import { InfoAlert } from './components/Alerts';
import { WarningAlert } from './components/Alerts';
import { ErrorAlert } from './components/Alerts';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      // set the warning alert message to an empty string ""
    } else {
      // set the warning alert message to a non-empty string
    }
    fetchData();
  }, [currentCity]);

  //ALERTS CONTAINER <<<<<<<<<<
  //all the alerts are displayed in the alerts container.
  return (
    <div className="App">
      <div className="alerts-container"> 
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert}
        setErrorAlert={setErrorAlert}
      />
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      <CityEventsChart allLocations={allLocations} events={events}/>
      <EventList events={events} />
    </div>
  );
};

export default App;