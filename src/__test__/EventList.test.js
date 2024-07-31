// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
        const EventListComponent = render(<EventList />);
        console.log(EventListComponent.container.innerHTML); // Log the rendered HTML
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    
  });
  test('renders correct number of events', async () => {//updated test - event id test was removed.
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
  test('renders correct event title', () => {  //test to check if the event title is rendered
    const { queryByText } = render(<EventList events={mockData} />);
    const event = mockData[0];
    expect(queryByText(event.summary)).toBeInTheDocument();
  });

  test('renders correct event start time', () => {//test to check if the event start time is rendered
    const { queryByText } = render(<EventList events={mockData} />);
    const event = mockData[0];
    expect(queryByText(event.created)).toBeInTheDocument();
  });

  test('renders correct event location', () => {//test to check if the event location is rendered
    const { queryByText } = render(<EventList events={mockData} />);
    const event = mockData[0];
    expect(queryByText(event.location)).toBeInTheDocument();
  });
} );