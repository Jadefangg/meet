// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
        const EventListComponent = render(<EventList />);
        console.log(EventListComponent.container.innerHTML); // Log the rendered HTML
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    
  });
  test('renders correct number of events', () => {
    const EventListComponent = render(<EventList events={
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    } />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
    console.log(EventList);
  });
} );