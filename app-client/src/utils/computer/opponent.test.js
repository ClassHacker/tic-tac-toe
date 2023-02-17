import { getOpponent } from "./opponent";

describe("test getOpponent", () => {
    it('should return correct opponent', () => {
        expect(getOpponent('EASY').level).toBe('EASY');
        expect(getOpponent('MEDIUM').level).toBe('MEDIUM');
        expect(getOpponent('HARD').level).toBe('HARD');
        expect(getOpponent('GOD').level).toBe('GOD');
        expect(getOpponent('').level).toBe('MEDIUM');
    })
})