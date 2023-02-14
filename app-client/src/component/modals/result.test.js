import { screen, fireEvent, render } from "@testing-library/react";
import { ResultModal } from "./result";

describe('test result modal', ()=> {
    it('should show modal when user wins the match', () => {
        const players = [{name:'user'},{name:'computer'}];
        render(<ResultModal players={players} bg={"success"} winner={'user'}/>);
        const modalBodyText = screen.queryByText(/You have won the match/i);
        expect(modalBodyText).toBeTruthy();
    })
    it('should show modal when computer wins the match', () => {
        const players = [{name:'user'},{name:'computer'}];
        render(<ResultModal players={players} bg={"success"} winner={'Computer'}/>);
        const modalBodyText = screen.queryByText(/You have lost the match/i);
        expect(modalBodyText).toBeTruthy();
    })
    it('should show modal when match ties', () => {
        const players = [{name:'user'},{name:'computer'}];
        render(<ResultModal players={players} bg={"success"} winner={null}/>);
        const modalBodyText = screen.queryByText(/Match Tied/i);
        expect(modalBodyText).toBeTruthy();
    })
    describe('test common fields', () => {
        const restartGameMock = jest.fn();
        const exitGameMock = jest.fn();
        const players = [{name:'user'},{name:'computer'}];
        beforeEach(() => {
            render(<ResultModal restartGame={restartGameMock} players={players} 
                exitGame={exitGameMock} bg={"success"} winner={null}/>);
        })
        afterEach(() => {
            restartGameMock.mockReset();
            exitGameMock.mockReset();
        })
        it('should show modal with both buttons', () => {
            const btn1 = screen.queryByText(/Play Again/i);
            const btn2 = screen.queryByText(/Exit/i);
            expect(btn1).toBeTruthy();
            expect(btn2).toBeInTheDocument();
        })
        it('should restart game on Play Again', () => {
            fireEvent.click(screen.queryByText(/Play Again/i));
            expect(restartGameMock).toHaveBeenCalledWith(null);
        })
        it('should exit game on Exit', () => {
            fireEvent.click(screen.queryByText(/Exit/i));
            expect(exitGameMock).toHaveBeenCalledTimes(1);
        })
    })
})