import { render, screen } from '@testing-library/react';
import Home from './component/home';

it('should render Home', () => {
  render(<Home />);
  const gameTitle = screen.getByText(/Tic-Tac-Toe/i);
  expect(gameTitle).toBeInTheDocument();
});
