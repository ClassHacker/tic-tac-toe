const EasyLevelOpponent = require('./easy');
const HardLevelOpponent = require('./hard');
const MediumLevelOpponent = require('./medium');
const GodLevelOpponent = require('./superComputer');

export function getOpponent(level) { 
  switch (level.toUpperCase()) {
    case 'EASY': return new EasyLevelOpponent.Computer('EASY');
    case 'MEDIUM': return new MediumLevelOpponent.Computer('MEDIUM');
    case 'HARD': return new HardLevelOpponent.Computer('HARD');
    case 'GOD': return new GodLevelOpponent.SuperComputer('GOD');
    default: return new MediumLevelOpponent.Computer('MEDIUM');
  }
}
