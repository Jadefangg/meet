// src/App.js

import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';

const [events, setEvents] = useState([]);
const [currentNOE, setCurrentNOE] = useState(32);

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  )};

export default App;