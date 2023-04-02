import React from 'react';
import Square from './square';
import './board.scss';

class Board extends React.Component {
  key = 0;

  getKey () {
    if (this.props.squares.every((value) => value === null)) {
      this.key++;
    }
    return this.key;
  }

  renderSquare (i) {
    return (
              <Square
                value={this.props.squares[i]}
                onClick={ () => this.props.onClick(i) }
              />
    );
  }

  render () {
    return (
        <div className="board flip" key={this.getKey()}>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

export default Board;
