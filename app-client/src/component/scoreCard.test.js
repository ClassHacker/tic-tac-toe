import { screen, render } from '@testing-library/react';
import { ScoreCard } from './scoreCard';

describe('test score card', () => {
  const players = [{ name: 'user', gamesWon: 2 }, { name: 'computer', gamesWon: 1 }];
  beforeEach(() => {
    render(<ScoreCard players={players} />);
  })
  it("should render user's score", () => {
    const userScore = screen.queryByText(/user : 2/i)
    expect(userScore).toBeTruthy();
  })
  it("should render computer's score", () => {
    const computerScore = screen.queryByText(/user : 2/i)
    expect(computerScore).toBeTruthy();
  })
})
