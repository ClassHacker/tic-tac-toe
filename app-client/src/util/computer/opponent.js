const EasyLevelOpponent = require('./easy');
const HardLevelOpponent = require('./hard');
const MediumLevelOpponent = require('./medium');
const GodLevelOpponent = require('./superComputer');

export function getOpponent(level) {
  level = ""
  console.log("Opponent level: ", level.length? level.toUpperCase(): "MEDIUM")  
  switch (level.toUpperCase()) {
    case 'EASY': return new EasyLevelOpponent.Computer();
    case 'MEDIUM': return new MediumLevelOpponent.Computer();
    case 'HARD': return new HardLevelOpponent.Computer();
    case 'GOD': return new GodLevelOpponent.Computer();
    default: return new MediumLevelOpponent.Computer();
  }
}
