import { SuperComputer } from "./superComputer";

export class Computer extends SuperComputer {
    makeFourthMove(squares, i) {
        this.X[3] = i;
        this.O[3] = this.getRandomMove();
        console.log('fourth move index:', this.O[3]);
        return this.O[3];
    }
}
