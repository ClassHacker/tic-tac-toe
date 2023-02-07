import { SuperComputer } from "./superComputer";

export class Computer extends SuperComputer {
    makeFourthMove(squares, ind) {
        this.X[3] = ind;
        let indexes = [];
        for(let i = 0; i < 9; i++) {
            if (this.X.indexOf(i) === -1 && this.O.indexOf(i) === -1) {
                indexes.push(i);
            }
        }
        this.O[3] = this.getLastMoveIndex(indexes);
        // indexes.push(this.O[3]);
        this.O[3] = this.getRandom(indexes);
        console.log('fourth move index:', this.O[3]);
        return this.O[3];
    }
}
