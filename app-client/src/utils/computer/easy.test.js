const EasyLevelOpponent = require('./easy');

describe("test easy level opponent", () => {
    let opponent = new EasyLevelOpponent.Computer('EASY');
    it('should return moves', () => {
        expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
        expect(opponent.makeSecondMove([], 2)).toBeGreaterThan(0);
        expect(opponent.makeThirdMove([], 8)).toBeGreaterThan(0);
    })
})