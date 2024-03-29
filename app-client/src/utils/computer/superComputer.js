export class SuperComputer {
  constructor (level) {
    this.X = [null, null, null, null];
    this.O = [null, null, null, null];
    this.row = [0, 0, 0];
    this.col = [0, 0, 0];
    this.level = level;
  }

  getRandom (array) {
    return array[Math.floor(Math.random() * array.length) | 0];
  }

  getCopyOf (computer) {
    this.X = computer.X;
    this.O = computer.O;
  }

  getListOfIndexes (index) {
    switch (index) {
      case 0:
        return [1, 2, 3, 6, 4, 8];
      case 1:
        return [0, 2, 4, 7];
      case 2:
        return [0, 1, 4, 6, 5, 8];
      case 3:
        return [0, 6, 4, 5];
      case 4:
        return [0, 8, 2, 6, 1, 7, 3, 5];
      case 5:
        return [3, 4, 2, 8];
      case 6:
        return [0, 3, 4, 2, 7, 8];
      case 7:
        return [1, 4, 6, 8];
      case 8:
        return [0, 4, 2, 5, 6, 7];
      default:
        return [];
    }
  }

  getRandomSideMove () {
    const remainingSquare = []
    let n = 1;
    while (n < 8) {
      if (this.X.includes(n) || this.O.includes(n)) {
        n += 2;
        continue;
      }
      remainingSquare.push(n);
      n += 2;
    }
    return this.getRandom(remainingSquare)
  }

  getRandomCornerMove () {
    const remainingSquare = []
    let n = 0;
    while (n < 8) {
      if (this.X.includes(n) || this.O.includes(n)) {
        n += 2;
        continue;
      }
      remainingSquare.push(n);
      n += 2;
    }
    return this.getRandom(remainingSquare)
  }

  getRandomMove () {
    console.log('Getting randome move...')
    const remainingSquare = []
    let n = 0;
    while (n < 9) {
      if (this.X.includes(n) || this.O.includes(n)) {
        n += 1;
        continue;
      }
      remainingSquare.push(n);
      n += 1;
    }
    return this.getRandom(remainingSquare)
  }

  getMoveIndex (steps) {
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
        // for diagonal steps
      case '48': return 0;
      case '46': return 2;
      case '08': return 4;
      case '26': return 4;
      case '24': return 6;
      case '04': return 8;
      default: return null;
    }
  }

  getMoveIndexV2 (isSame) {
    if (isSame === false) {
      const row = this.row.indexOf(0);
      const col = this.col.indexOf(0);
      const rc = String(row) + col;
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
          // return this.X.indexOf(0) === -1? 0 : 2;
          return this.X.includes(0) ? 2 : 0;
        case '01':
          // return this.X.indexOf(6) === -1? 6 : 8;
          return this.X.includes(6) ? 8 : 6;
        case '10':
          // return this.X.indexOf(2) === -1? 2 : 8;
          return this.X.includes(2) ? 8 : 2;
        case '12':
          // return this.X.indexOf(0) === -1? 0 : 6;
          return this.X.includes(0) ? 6 : 0;
        default:
          console.log('rc :', rc);
      }
    }
    // if (this.col.indexOf(0) === 1 && this.row.indexOf(0) === 1){
    if (this.col.indexOf(0) === 1 && this.row.indexOf(0) === 1) {
      return this.getRandom([1, 3, 5, 7]);
    }
    return this.getRandomCornerMove();
  }

  updateRowAndCol (x) {
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

  getLastMoveIndex (indexes) {
    // Check for win: O
    for (let j = 0; j < 2; j++) {
      const index = indexes[j];
      const z = this.getListOfIndexes(index);
      for (let i = 0; i < z.length; i += 2) {
        if (this.O.includes(z[i]) && this.O.includes(z[i + 1])) {
          return index;
        }
      }
    }
    // Check for win: X
    for (let j = 0; j < 2; j++) {
      const index = indexes[j];
      const z = this.getListOfIndexes(index);
      for (let i = 0; i < z.length; i += 2) {
        if (this.X.includes(z[i]) && this.X.includes(z[i + 1])) {
          return index;
        }
      }
    }
    return this.getRandom(indexes);
  }

  // This will return either 4 or corner move
  makeFirstMove (squares, ind) {
    this.X[0] = ind; // for future use
    if (this.X[0] === 4) {
      this.O[0] = this.getRandomCornerMove();
      console.log('first move index:', this.O[0]);
      return this.O[0];
    }
    this.O[0] = 4; // best move
    console.log('first move index:', this.O[0]);
    return 4;
  }

  makeSecondMove (squares, ind) {
    this.X[1] = ind;

    // if X is winning
    const steps = String(Math.min(this.X[0], this.X[1])) + String(Math.max(this.X[0], this.X[1]));
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
    console.log('second move index:', this.O[1]);
    return this.O[1];
  }

  makeThirdMove (squares, ind) {
    this.X[2] = ind;

    // if O is winning
    let steps = String(Math.min(this.O[0], this.O[1])) + String(Math.max(this.O[0], this.O[1]));
    let index = this.getMoveIndex(steps);
    // if (index != null && this.X.indexOf(index) === -1) {
    if (index != null && !this.X.includes(index)) {
      this.O[2] = index;
      console.log('third move index:', this.O[2]);
      return this.O[2];
    }

    // if X is winning
    steps = String(Math.min(this.X[0], this.X[2])) + String(Math.max(this.X[0], this.X[2]));
    index = this.getMoveIndex(steps);
    // if (index != null && this.O.indexOf(index) === -1 && this.X.indexOf(index) === -1) {
    if (index != null && !(this.O.includes(index) || this.X.includes(index))) {
      this.O[2] = index;
      console.log('third move index:', this.O[2]);
      return this.O[2];
    }

    // if x is winning
    steps = String(Math.min(this.X[1], this.X[2])) + String(Math.max(this.X[1], this.X[2]));
    index = this.getMoveIndex(steps);
    // if (index != null && this.O.indexOf(index) === -1 && this.X.indexOf(index) === -1) {
    if (index != null && !(this.X.includes(index) || this.O.includes(index))) {
      this.O[2] = index;
      console.log('third move index:', this.O[2]);
      return this.O[2];
    }

    // if nobody is winning
    const indexes = [1, 3, 5, 7];
    for (let i = 0; i < indexes.length; i++) {
      // if (this.X.indexOf(indexes[i]) === -1 && this.O.indexOf(indexes[i]) === -1) {
      if (!(this.X.includes(indexes[i]) || this.O.includes(indexes[i]))) {
        this.O[2] = indexes[i];
        console.log('third move index:', this.O[2]);
        return this.O[2];
      }
    }
    console.log('third move index:', this.O[2]);
    return this.O[2];
  }

  makeFourthMove (squares, ind) {
    this.X[3] = ind;
    const indexes = [];
    for (let i = 0; i < 9; i++) {
      // if (this.X.indexOf(i) === -1 && this.O.indexOf(i) === -1) {
      if (!(this.X.includes(i) || this.O.includes(i))) {
        indexes.push(i);
      }
    }
    this.O[3] = this.getLastMoveIndex(indexes);
    console.log('fourth move index: ', this.O[3]);
    return this.O[3];
  }
}
