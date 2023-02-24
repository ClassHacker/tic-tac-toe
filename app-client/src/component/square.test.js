import { screen, render , fireEvent} from "@testing-library/react";
import Square from "./square";

describe("test square", () => {
    it('should render square', () => {
        const onClickMock = jest.fn();
        render(<Square onClick={onClickMock} value={0}/>);
        fireEvent.click(screen.getByText(0));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })
})