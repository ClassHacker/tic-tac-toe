import { screen, fireEvent, render } from "@testing-library/react";
import { Level } from "./level";

describe('test level modal', () => {
    let setLevelMock = jest.fn();
    beforeEach(() => {
        render(<Level setLevel = {setLevelMock} show={true} />);
    })
    afterEach(() => {
        setLevelMock.mockReset();
    })
    it('should show modal with all buttons', () => {
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
    it('should select EASY level', () => {
        const btn1 = screen.queryByText(/Easy Level/i);
        fireEvent.click(btn1);
        expect(setLevelMock).toHaveBeenCalledWith('EASY');
        expect(setLevelMock).toHaveBeenCalledTimes(1);
    })
    it('should select MEDIUM level', () => {
        const btn1 = screen.queryByText(/MEDIUM Level/i);
        fireEvent.click(btn1);
        expect(setLevelMock).toHaveBeenCalledWith('MEDIUM');
        expect(setLevelMock).toHaveBeenCalledTimes(1);
    })
    it('should select HARD level', () => {
        const btn1 = screen.queryByText(/HARD Level/i);
        fireEvent.click(btn1);
        expect(setLevelMock).toHaveBeenCalledWith('HARD');
        expect(setLevelMock).toHaveBeenCalledTimes(1);
    })
    it('should select GOD level', () => {
        const btn1 = screen.queryByText(/GOD Level/i);
        fireEvent.click(btn1);
        expect(setLevelMock).toHaveBeenCalledWith('GOD');
        expect(setLevelMock).toHaveBeenCalledTimes(1);
    })
})