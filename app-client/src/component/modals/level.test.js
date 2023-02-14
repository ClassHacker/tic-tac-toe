import { screen, fireEvent, render } from "@testing-library/react";
import { Level } from "./level";

describe('test level modal', () => {
    it('should show modal with all buttons', () => {
        render(<Level setLevel = {null} show={true} />);
        const heading = screen.queryByText(/Please select a level/i);
        expect(heading).toBeInTheDocument();
        const btn1 = screen.queryByText(/Easy Level/i);
        const btn2 = screen.queryByText(/Medium Level/i);
        const btn3 = screen.queryByText(/Hard Level/i);
        const btn4 = screen.queryByText(/God Level/i);
        expect(heading).toBeInTheDocument();
        expect(btn1).toBeTruthy();
        expect(btn2).toBeTruthy();
        expect(btn3).toBeTruthy();
        expect(btn4).toBeTruthy();
    })
})