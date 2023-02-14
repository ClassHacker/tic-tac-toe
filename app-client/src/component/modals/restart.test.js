import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test/test-utils";
import { RestartModal } from "./restart";

describe('test restart modal', ()=> {
    it('should render exitModal', () => {
        renderWithProviders(<RestartModal />, { preloadedState: {rsR: true} });
        const modalBodyText = screen.getByText(/Do you really want to restart the game?/i);
        expect(modalBodyText).toBeInTheDocument();
    })
    it('should exit game on Yes', () => {
        const restartGameMock = jest.fn()
        renderWithProviders(<RestartModal restartGame={restartGameMock} winner={'winner'}/>, { preloadedState: {rsR: true} });
        fireEvent.click(screen.getByText(/Yes/i));
        expect(restartGameMock).toHaveBeenCalledWith("winner");
        expect(restartGameMock).toHaveBeenCalledTimes(1);
    })
    it('should not exit game on No', () => {
        const restartGameMock = jest.fn()
        renderWithProviders(<RestartModal restartGame={restartGameMock}/>, { preloadedState: {rsR: true} });
        fireEvent.click(screen.getByText(/No/i));
        expect(restartGameMock).toHaveBeenCalledTimes(0);
    })
})
