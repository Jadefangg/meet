// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
    test('renders list of events', () => { //the actual function which will contain the test code.
        const AppDOM = render(<App />).container.firstChild; // render the App component and get the container element - dom node
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument(); //.toBeInTheDocument() is a matcher that checks if the element is present in the DOM
      });

});