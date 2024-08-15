// src/__tests__/EventList.test.js
// INTEGRATION TEST - EventList.test.js BETWEEN APP AND EVENTLIST COMPONENTS.

import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import { mockData } from '../mock-data.js';
import App from '../App.js';

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

    test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

 /* test('renders correct event title', () => {
    const { queryByText } = render(<EventList events={mockData} />);
    const event = mockData[0];
    expect(queryByText(event.summary)).toBeInTheDocument();  });

  test('renders correct event start time', () => {
    const { queryByText, container } = render(<EventList events={mockData} />);
    const event = mockData[0];
    console.log(container.innerHTML);
    expect(queryByText(event.created)).toBeInTheDocument();
  });

  test('renders correct event location', () => {
    const { queryByText } = render(<EventList events={mockData} />);
    const event = mockData[0];
    expect(queryByText(event.location)).toBeInTheDocument();
  });*/
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(19);
    });
  });
});