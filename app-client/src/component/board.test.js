import { render } from '@testing-library/react';
import Board from './board';

describe('test board', () => {
  it('should render game board', () => {
    const onClickMock = jest.fn();
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    render(<Board onClick={onClickMock} squares={squares}/>);
  })
})
