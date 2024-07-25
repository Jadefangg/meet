// src/__tests__/App.test.js

import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // Example of querying an element by its text
  expect(linkElement).toBeInTheDocument();
});//commit