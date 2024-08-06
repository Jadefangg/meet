// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import App from '../App';
import EventList from '../components/EventList';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    console.log(EventList);
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    console.log(EventList);
  });
  
    
  test('render NumberOfEvents', () => {  // test to check if the NumberOfEvents component is rendered
    expect(AppDOM.querySelector('#numberOfevents')).toBeInTheDocument(); 
  });
});//4.5