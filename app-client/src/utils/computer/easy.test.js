import { Computer as EasyLevelOpponent } from './easy';

const sideMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomSideMove').mockImplementation(() => 1)
const cornerMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomCornerMove').mockImplementation(() => 6)
const randomMoveMock = jest.spyOn(EasyLevelOpponent.prototype, 'getRandomMove').mockImplementation(() => 4)

describe('test easy level opponent', () => {
  let opponent;
  let log;
  beforeEach(() => {
    opponent = new EasyLevelOpponent('EASY');
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  })
  afterEach(() => {
    opponent = null;
    sideMoveMock.mockClear();
    cornerMoveMock.mockClear();
    randomMoveMock.mockClear();
    log.mockClear();
  })
  it('should make correct moves when computer is winning 1', () => {
    expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
    expect(sideMoveMock).toHaveBeenCalled();
    expect(opponent.makeSecondMove([], 5)).toBeGreaterThan(0);
    expect(randomMoveMock).toHaveBeenCalled();
    expect(opponent.makeThirdMove([], 2)).toBeGreaterThan(0);
  })
  it('should make correct moves when user in winning 1', () => {
    expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
    expect(sideMoveMock).toHaveBeenCalled();
    expect(opponent.makeSecondMove([], 3)).toBeGreaterThan(0);
    expect(opponent.makeThirdMove([], 8)).toBeGreaterThan(0);
    expect(opponent.makeFourthMove([], 7)).toBeGreaterThan(0);
  })
  it('should make correct moves when user in winning 2', () => {
    expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
    expect(sideMoveMock).toHaveBeenCalled();
    expect(opponent.makeSecondMove([], 2)).toBeGreaterThan(0);
    expect(cornerMoveMock).toHaveBeenCalled();
    expect(opponent.makeThirdMove([], 5)).toBeGreaterThan(0);
    expect(opponent.makeFourthMove([], 7)).toBeGreaterThan(0);
  })
  it('should make correct moves when nobody is winning 1', () => {
    expect(opponent.makeFirstMove([], 0)).toBeGreaterThan(0);
    expect(sideMoveMock).toHaveBeenCalled();
    expect(opponent.makeSecondMove([], 3)).toBeGreaterThan(0);
    expect(opponent.makeThirdMove([], 7)).toBeGreaterThan(0);
  })
})
