import React from 'react';
import Board from './board';
import calculateWinner from '../util/winner';
import './game.scss';
import { Badge } from 'react-bootstrap';

const computer = require('../util/computer');

var player2 = new computer.Computer();
var player2Copy = new computer.Computer();

class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history : [{
          squares: Array(9).fill(null)
        }], 
        stepNumber : 0,
        xIsNext : true, 
        players : props.players,    
      }
    }
  
    getInitialState(){
      return {
        history : [{
          squares: Array(9).fill(null)
        }], 
        stepNumber : 0,
        xIsNext : true, 
        players : this.state.players,
      }
    }
  
    getPlayers = async () =>  {
      await fetch('http://localhost:8080/players/',{
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
        .then(res => res.json())
        .then(result => {
          this.setState({
            players: result.players,
          })
          console.log(result);
      }, error => console.log(error))
    }
  
    updatePlayer = async (player) => {
      await fetch(`http://localhost:8080/players/${player._id}`,{
          method: 'PUT',
          body: JSON.stringify({gamesWon: player.gamesWon+1}),
          headers: {'Content-Type':'application/json'}
        }).then(res => res.json())
          .then(result => {
            console.log(result);
            this.getPlayers()
        }, error => console.log(error))
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[history.length-1]
      const squares = current.squares.slice();
      if (calculateWinner(squares, this.state.players) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history : history.concat({
          squares: squares,
        }),
        xIsNext: !this.state.xIsNext,
        stepNumber : history.length,
      });
    }
  
    makeMove(i){
      if(player2.X.indexOf(i) === -1 && player2.O.indexOf(i) === -1) {
        // music.playSound("s1"); 
        this.handleClick(i);
        let index = null;
        if (this.props.isMultiPlayer === true) {
          switch(this.state.stepNumber){
            case 0:
              index = player2.makeFirstMove([],i);
              break;
            case 2:
              index = player2.makeSecondMove([],i);
              break;
            case 4:
              index = player2.makeThirdMove([],i);
              break;
            case 6:
              index = player2.makeFourthMove([],i);
              break;
            default:
              index = undefined;
          }
          if(index !== null && index !== undefined) {
            console.log("Index : ", index)
            setTimeout(() => this.handleClick(index), 100)
          } else {
            console.log("Unable to get move index");
          }
          player2Copy.getCopyOf(player2);
        }
      }
    }
  
    jumpTo(step){
      // music.playSound("s1");
      if(this.props.isMultiPlayer && step < 9) {
        if(step%2){
          step += 1;
        }
        player2.X = player2Copy.X.splice((step/2)-1, 4-(step/2));
        player2.O = player2Copy.O.splice((step/2)-1, 4-(step/2));
      }
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      })
    }
  
    newGame(winner){
      // music.playSound("s1");
      player2 = new computer.Computer()
      this.setState(
        this.getInitialState()
      );
      this.state.players.map((player) => {
        if (winner === player.name) 
          // this.updatePlayer(player);
          player.gamesWon += 1
      });
    }
  
    exitGame(){
      // music.playSound("s1");
      window.location.reload();
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares, this.state.players);
      const moves = history.map((step,move) => {
        const desc = move ?
          'Go to move #' + (move) :
          'Go to game start';
        return (
          <li key={move}>
            <button className='button' onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })
  
      let status;
      let bg = "dark";
      if (winner) {
        bg = "success";
        status = 'Winner : ' + winner;
      } else {
        status = 'Current Player : ' + (this.state.xIsNext ? this.state.players[0].name : this.state.players[1].name);
        if(this.state.stepNumber === 9) {
          status = "Draw";
        }
      }
  
      return (
        <div className='row'>
          <h1>Tic-Tac-Toe</h1>
          <div className='col-lg-3 col-sm-12'>
            <button className='start-button' onClick={() => this.newGame(winner)}>Play Again</button>
            <button className='start-button' onClick={() => this.exitGame()}>Exit Game</button>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="game-board">
            <span className="status"><Badge bg={bg} pill>{status}</Badge></span>
              <Board 
                squares={current.squares}
                onClick={(i)=>{this.makeMove(i)}}
              />
            </div>
          </div>
          <div className='col-lg-3 col-sm-12'>
            <div className="games-won">
              <span className="player0">
                <Badge bg="secondary">{this.state.players[0].name} : {this.state.players[0].gamesWon}</Badge>
              </span>
              <span className="player1">
                <Badge bg="secondary">{this.state.players[1].name} : {this.state.players[1].gamesWon}</Badge>
              </span>
            </div>
            </div>
        </div>
      );  
    }
  }

  export default Game;
