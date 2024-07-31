import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data.js';
import Event from '../components/Event';
import NumberofEvents from '../components/NumberofEvents';

describe('<NumberofEvents /> component', () => {
    test('has number of events', () => {
        const NumberofEventsComponent = render(<NumberofEvents />);
        expect(NumberofEventsComponent.queryByRole("input")).toBeInTheDocument();
    });
});