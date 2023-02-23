import { getOpponent } from "./opponent";

describe("test getOpponent", () => {
    it('should return opponent correct level', () => {
        expect(getOpponent('easy').level).toBe('EASY');
        expect(getOpponent('MEDIUM').level).toBe('MEDIUM');
        expect(getOpponent('hARD').level).toBe('HARD');
        expect(getOpponent('GOD').level).toBe('GOD');
        expect(getOpponent('').level).toBe('MEDIUM');
    })
})