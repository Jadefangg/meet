// src/components/EventList.js

const EventList = () => {
    return (
      <div id="event-list"></div>
    );
  }
  
  export default EventList;
  Then, in App.js, import the EventList component and render <EventList /> instead of <div id="event-list"></div>:
  
  // src/App.js
  
  import EventList from './components/EventList';
  import './App.css';
  
  const App = () => {
    return (
      <div className="App">
        <EventList />
      </div>
    );
  }
  
  export default App;