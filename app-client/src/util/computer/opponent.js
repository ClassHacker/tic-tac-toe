const EasyLevelOpponent = require('./easy');
const HardLevelOpponent = require('./hard');
const MediumLevelOpponent = require('./medium');
const GodLevelOpponent = require('./superComputer');

export function getOpponent(level) { 
  switch (level.toUpperCase()) {
    case 'EASY': return new EasyLevelOpponent.Computer(level);
    case 'MEDIUM': return new MediumLevelOpponent.Computer(level);
    case 'HARD': return new HardLevelOpponent.Computer(level);
    case 'GOD': return new GodLevelOpponent.SuperComputer(level);
    default: return new MediumLevelOpponent.Computer(level);
  }
}
