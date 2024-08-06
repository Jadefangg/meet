import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data.js';
import Eventlist from '../components/Event.js/index.js';
import NumberOfEvents from '../components/NumberOfEvents.js';

describe('<NumberOfEvents /> component', () => {
    test('has number of events', () => { // test to ensure that the component contains a textbox
        const NumberofEventsComponent = render(<NumberOfEvents />);
        expect(NumberofEventsComponent.queryByRole("textbox")).toBeInTheDocument();
    });
    
    test('default value of the textbox is 32', () => { //test to check if the default value of the textbox is 32
        const { getByRole } = render(<NumberOfEvents />);
        const input = getByRole('input');
        expect(input.value).toBe('32');
    });

    test('value of the textbox changes when user types in it', async () => { //test to check if the value of the textbox changes when the user types in it
        const { getByRole } = render(<NumberOfEvents />);
        const input = getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.type(input, '10');
        expect(input.value).toBe('10');
    });
});