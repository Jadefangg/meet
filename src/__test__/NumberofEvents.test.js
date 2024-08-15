import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data.js';
//import Eventlist from '../components/Event.js/index.js';
import NumberOfEvents from '../components/NumberOfEvents.js';
import { getEvents } from "../api";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
      NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />);
    });
    test('has number of events', () => {
        const NumberOfEventsComponent = render(<NumberOfEvents />);
        expect(NumberOfEventsComponent.getByRole("input")).toBeInTheDocument();
    });
    
    test('default number of events is 32', () => {
        expect( NumberOfEventsComponent.getByRole('input')).toHaveValue('19');  
      });  

      test('change number of events when a user types in the textbox', async () => { 
        const numverOfEvents = NumberOfEventsComponent.getByRole('input');
        const user = userEvent.setup(); 
        await user.type(numverOfEvents, '{backspace}{backspace}10');   
        const allEvents = await getEvents(); 
        NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE={allEvents} setErrorAlert={() => {}} />);   
        expect(numverOfEvents).toHaveValue('10'); 
      }); 
});