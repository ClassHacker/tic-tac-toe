import { render, screen } from '@testing-library/react';
import App from './app';

test('renders App', () => {
  expect(1).toBe(1);
  render(<App root={"root"}/>);
});
