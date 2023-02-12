import { screen } from "@testing-library/react";
import { ExitModal } from "./exit";
import { renderWithProviders } from "../../utils/test/test-utils";

describe('test exitModal', ()=> {
    it('should render exitModal', ()=> {
        renderWithProviders(<ExitModal />, { preloadedState: {exR: true} });
        const modalBodyText = screen.getByText(/Do you really want to exit the game?/i);
        expect(modalBodyText).toBeInTheDocument();
    })
})