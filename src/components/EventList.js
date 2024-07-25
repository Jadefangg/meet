// src/components/EventList.js
import Event from './Event';

const EventList = ({events}) => {
    return (
      <ul id="event-list">learn react {events? events.map(event => <Event event={event.id} />): null}</ul>
    );
  }
  
  export default EventList;