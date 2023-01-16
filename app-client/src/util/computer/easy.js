export class Computer {
    constructor() {
        this.X = [null, null, null, null];
        this.O = [null, null, null, null];
        this.row = [0, 0, 0];
        this.col = [0, 0, 0];
    }

    getCopyOf(computer){
        this.X = computer.X;
        this.O = computer.O;
    }

    getMoveIndex(steps) {
        switch (steps) {
            // for horizontal steps
            case '12': return 0;
            case '02': return 1;
            case '01': return 2;
            case '45': return 3;
            case '35': return 4;
            case '34': return 5;
            case '78': return 6;
            case '68': return 7;
            case '67': return 8;
            // for vertical steps
            case '36': return 0;
            case '47': return 1;
            case '58': return 2;
            case '06': return 3;
            case '17': return 4;
            case '28': return 5;
            case '03': return 6;
            case '14': return 7;
            case '25': return 8;
            //for diagonal steps
            case '48': return 0;
            case '46': return 2;
            case '08': return 4;
            case '26': return 4;
            case '24': return 6;
            case '04': return 8;
            default: return null;
        }
    }

    getMoveIndexV2(isSame) {
        if (isSame === false) {
            let row = this.row.indexOf(0);
            let col = this.col.indexOf(0);
            let rc = String(row)+col;
            switch (rc) {
                case '22':
                    return 0;
                case '20':
                    return 2;
                case '02':
                    return 6;
                case '00':
                    return 8;
                case '21':
                    return this.X.indexOf(0) === -1? 0 : 2;
                case '01':
                    return this.X.indexOf(6) === -1? 6 : 8;
                case '10':
                    return this.X.indexOf(2) === -1? 2 : 8;
                case '12':
                    return this.X.indexOf(0) === -1? 0 : 6;
                default:
                    return null;
            }
        } else {
            if (this.row.indexOf(2) === 1 || this.col.indexOf(2) === 1) {
                return 0;
            } else if (this.col.indexOf(0) === 1 && this.row.indexOf(0) === 1){
                return 1;
            } else {
                return 2;
            }
        }
    }

    updateRowAndCol(x) {
        switch (x) {
            case 0:
                this.row[0] += 1
                this.col[0] += 1
                break
            case 1:
                this.row[0] += 1
                this.col[1] += 1
                break
            case 2:
                this.row[0] += 1
                this.col[2] += 1
                break
            case 3:
                this.row[1] += 1
                this.col[0] += 1
                break
            case 4:
                this.row[1] += 1
                this.col[1] += 1
                break
            case 5:
                this.row[1] += 1
                this.col[2] += 1
                break
            case 6:
                this.row[2] += 1
                this.col[0] += 1
                break
            case 7:
                this.row[2] += 1
                this.col[1] += 1
                break
            case 8:
                this.row[2] += 1
                this.col[2] += 1
                break
            default:
                this.row = [0, 0, 0]
                this.col = [0, 0, 0]
        }
    }

    getLastMoveIndex(z, index) {
        // Check for win
        for(let i = 0; i < z.length; i += 2) {
            if (this.O.indexOf(z[i]) !== -1 && this.O.indexOf(z[i+1]) !== -1) {
                return index;
            }
        }
        // Check for draw
        for(let i = 0; i < z.length; i += 2) {
            if (this.X.indexOf(z[i]) !== -1 && this.X.indexOf(z[i+1]) !== -1) {
                return index;
            }
        }
        return null;
    }

    // This will return either 0 or 4
    makeFirstMove(squares, i) {
        this.X[0] = i;
        this.O[0] = this.getRandomMove();
        return this.O[0];
    }
    
    makeSecondMove(squares, i) {
        this.X[1] = i;
        this.O[1] = this.getRandomMove();;
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

    getRandomMove() {
        let remainingSquare = []
        let n = 0;
        while(n < 8) {
            if (this.X.includes(n) || this.O.includes(n))
            {
                n += 1;
                continue;
            }
            remainingSquare.push(n);
            n += 1;
        }
        return remainingSquare[(Math.random() * remainingSquare.length) | 0]
    }
}
