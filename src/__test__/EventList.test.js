// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
        const EventListComponent = render(<EventList />);
        console.log(EventListComponent.container.innerHTML); // Log the rendered HTML
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    
  });
  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
} );