// src/App.js

import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations,getEvents } from './api';

import './App.css';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
useEffect(() => {
  fetchData();
}, [currentCity]);

return (
  <div className="App">
    <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    <NumberOfEvents currentNOE = {currentNOE} setCurrentNOE={setCurrentNOE} />
    <EventList events={events} />
  </div>
);
};

export default App; //OOP NEEDS TO BE ADDED