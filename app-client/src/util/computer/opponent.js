const EasyLevelOpponent = require('./easy');
const HardLevelOpponent = require('./hard');
const MediumLevelOpponent = require('./medium');
const GodLevelOpponent = require('./superComputer');

export function getOpponent(level) {
  console.log("Opponent level: ", level.length? level.toUpperCase: "MEDIUM")  
  switch (level) {
    case 'easy': return new EasyLevelOpponent.Computer();
    case 'medium': return new MediumLevelOpponent.Computer();
    case 'hard': return new HardLevelOpponent.Computer();
    case 'god': return new GodLevelOpponent.Computer();
    default: return new MediumLevelOpponent.Computer();
  }
}
