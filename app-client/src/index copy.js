import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import backGround from "./static/bg.mp3";
import { Button, Form, Modal} from 'react-bootstrap';
import App from './app';

var music = require('./utils/sound');
const computer = require('./utils/computer');
var player2 = new computer.Computer();
var player2Copy = new computer.Computer();

// let audio = new Audio(backGround);
// audio.play();
// audio.addEventListener('ended',() => audio.play())


async function startGame(root, userName, isSinglePlayer) {
  Promise.all([
    // removing the existing players
    await fetch('http://localhost:8080/players/',{
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    }),
    // adding player #1
    await fetch(`http://localhost:8080/add_player/`,{
      method: 'POST',
      body: JSON.stringify({
        _id: 1,
        name: userName,
        gamesWon: 0
      }),
      headers: {'Content-Type':'application/json'}
    }),
    // adding computer as player #2
    await fetch(`http://localhost:8080/add_player/`,{
      method: 'POST',
      body: JSON.stringify({
        _id: 2,
        name: "Computer",
        gamesWon: 0
      }),
      headers: {'Content-Type':'application/json'}
    }),
    // fetching players
    await fetch('http://localhost:8080/players/',{
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
  ])
  // handle reponses
  .then(responses=>Promise.all(responses.map(res => res.json())))
  // handle response body
  .then(responses => {
    let players = responses[3].players;
    console.log(players);
    root.render( <Game players = {players} isSinglePlayer = {isSinglePlayer}/>);
  })
  .catch((err) => {
    console.log(err)
  });
}

async function startGame2(root, Username, isSinglePlayer) {
  const userName = isSinglePlayer? 'Computer' : "XYZ";
  let players = [
    {name: Username, gamesWon: 0},
    {name: userName, gamesWon: 0}
  ]
  root.render( <Game players = {players} isSinglePlayer = {isSinglePlayer}/>);
}

function Square(props) {
    return (
        <button 
          className="square" 
          onClick={props.onClick}
        >
          {props.value}
        </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
            <Square 
              value={this.props.squares[i]}
              onClick={ ()=>this.props.onClick(i) }
            />
          );
  }
  
  render() {
    return (
      <div>
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
      if (this.props.isSinglePlayer === true) {
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
    if(this.props.isSinglePlayer && step < 9) {
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

  restartGame(winner){
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
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Current Player: ' + (this.state.xIsNext ? this.state.players[0].name : this.state.players[1].name);
      if(this.state.stepNumber === 9) {
        status = "Draw";
      }
    }

    return (
      <div className='row'>
        <h1>Tic-Tac-Toe</h1>
        <div className='col-sm-4'>
          <button className='start-button' onClick={() => this.restartGame(winner)}>Play Again</button>
          <button className='start-button' onClick={() => this.exitGame()}>Exit Game</button>
        </div>
        <div className="col-sm-4">
          <p>{status}</p>
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=>{this.makeMove(i)}}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className='games-won'>
            <span>
              {this.state.players[0].name} : {this.state.players[0].gamesWon}
            </span>
            <span>
               {this.state.players[1].name} : {this.state.players[1].gamesWon}
            </span>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );  
  }
}

function calculateWinner(squares, players){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === 'X' ? players[0].name : players[1].name;
    }
  }
  return null;
}
  
// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)