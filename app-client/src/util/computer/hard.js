import { SuperComputer } from "./superComputer";

export class Computer extends SuperComputer {
    makeSecondMove(squares, i) {
        this.X[1] = i;

        // if X is winning
        let steps = String(Math.min(this.X[0], this.X[1])) + String(Math.max(this.X[0], this.X[1]));
        let index = this.getMoveIndex(steps);

        // if can't get right index from above method
        if (index == null || index === this.O[0]) {
            this.updateRowAndCol(this.X[0]);
            this.updateRowAndCol(this.X[1]);
            index = this.getMoveIndexV2(index === this.O[0]);
        }

        this.O[1] = index;
        this.row = [0, 0, 0];
        this.col = [0, 0, 0];
        return this.O[1];
    }
    
    makeFourthMove(squares, i) {
        this.X[3] = i;
        this.O[3] = this.getRandomMove(); 
        return this.O[3];
    }
}
