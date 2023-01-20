import { SuperComputer as GodLevelOpponent} from "./superComputer";
import { Computer as EasyLevelOpponent} from "./easy";
import { Computer as HardLevelOpponent} from "./hard";
import { Computer as MediumLevelOpponent} from "./easy";

export function getOpponent(level) {
    switch (level) {
      case 'easy': return new EasyLevelOpponent.Computer();
      case 'medium': return new MediumLevelOpponent.Computer();
      case 'hard': return new HardLevelOpponent.Computer();
      case 'god': return new GodLevelOpponent.Computer();
      default: return new MediumLevelOpponent.Computer();
    }
  }