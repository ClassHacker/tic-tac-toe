import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test/test-utils';
import { RestartModal } from './restart';

jest.mock('../../utils/sound');

describe('test restart modal', () => {
  const restartGameMock = jest.fn();
  beforeEach(() => {
    renderWithProviders(<RestartModal restartGame={restartGameMock} winner={'winner'}/>,
      { preloadedState: { rsR: true } });
  })
  afterEach(() => {
    restartGameMock.mockReset();
  })
  it('should show modal with both buttons', () => {
    const modalBodyText = screen.getByText(/Do you really want to restart the game?/i);
    const btn1 = screen.queryByText(/Yes/i);
    const btn2 = screen.queryByText(/No/i);
    expect(modalBodyText).toBeTruthy();
    expect(btn1).toBeTruthy();
    expect(btn2).toBeInTheDocument();
  })
  it('should restart game on Yes', () => {
    fireEvent.click(screen.getByText(/Yes/i));
    expect(restartGameMock).toHaveBeenCalledWith('winner');
  })
  it('should not restart game on No', () => {
    fireEvent.click(screen.getByText(/No/i));
    expect(restartGameMock).toHaveBeenCalledTimes(0);
  })
})
