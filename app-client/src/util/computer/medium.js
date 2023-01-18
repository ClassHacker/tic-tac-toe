import { SuperComputer } from "./superComputer";

export class Computer extends SuperComputer {
    makeFirstMove(squares, i) {
        this.X[0] = i;
        this.O[0] = this.getRandomMove();
        return this.O[0];
    }
    
    makeSecondMove(squares, i) {
        this.X[1] = i;

        // if X is winning
        let steps = String(Math.min(this.X[0], this.X[1])) + String(Math.max(this.X[0], this.X[1]));
        this.O[1] = this.getMoveIndex(steps);
        // if X is not winning
        if(!this.O[1] || this.O[1] == this.O[0])
            this.O[1] = this.getRandomMove();
        return this.O[1];
    }
    
    makeThirdMove(squares, i) {
        this.X[2] = i;
        this.O[2] = this.getRandomMove();
        return this.O[2];
    }
    
    makeFourthMove(squares, i) {
        this.X[3] = i;
        this.O[3] = this.getRandomMove(); 
        return this.O[3];
    }
}
