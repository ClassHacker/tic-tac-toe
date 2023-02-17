// const EasyLevelOpponent = require('./easy');
import { Computer as EasyLevelOpponent } from './easy';

const sideMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomSideMove')
                        .mockImplementation(() => {
                            return 1;
                        })
const cornerMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomCornerMove')
                        .mockImplementation(() => {
                            return 6;
                        })
const randomMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomMove')
                        .mockImplementation(() => {
                            return 8;
                        })
describe("test easy level opponent", () => {
    let opponent = new EasyLevelOpponent('EASY');
    it('should return moves', () => {
        expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
        expect(sideMoveMock).toHaveBeenCalled();
        expect(opponent.makeSecondMove([], 3)).toBeGreaterThan(0);
        expect(opponent.makeThirdMove([], 8)).toBeGreaterThan(0);
    })
})