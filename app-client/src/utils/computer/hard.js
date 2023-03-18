import { SuperComputer } from "./superComputer";

export class Computer extends SuperComputer {
    makeFourthMove(squares, ind) {
        this.X[3] = ind;
        let indexes = [];
        for(let i = 0; i < 9; i++) {
            if (!(this.X.includes(i) || this.O.includes(i))) {
                indexes.push(i);
            }
        }
        this.O[3] = this.getLastMoveIndex(indexes);
        for(let i = 0; i < 8; i++) {
            indexes.push(this.O[3]);
        }
        this.O[3] = this.getRandom(indexes);
        console.log('fourth move index:', this.O[3]);
        return this.O[3];
    }
}
