import { screen, fireEvent } from "@testing-library/react";
import { ExitModal } from "./exit";
import { renderWithProviders } from "../../utils/test/test-utils";

describe('test exit modal', ()=> {
    it('should render exitModal', () => {
        renderWithProviders(<ExitModal />, { preloadedState: {exR: true} });
        const modalBodyText = screen.getByText(/Do you really want to exit the game?/i);
        expect(modalBodyText).toBeInTheDocument();
    })
    it('should exit game on Yes', () => {
        const exitFunc = jest.fn()
        renderWithProviders(<ExitModal exitGame={exitFunc}/>, { preloadedState: {exR: true} });
        fireEvent.click(screen.getByText(/Yes/i));
        expect(exitFunc).toHaveBeenCalledTimes(1);
    })
    it('should not exit game on No', () => {
        const exitFunc = jest.fn()
        renderWithProviders(<ExitModal exitGame={exitFunc}/>, { preloadedState: {exR: true} });
        fireEvent.click(screen.getByText(/No/i));
        expect(exitFunc).toHaveBeenCalledTimes(0);
    })
})