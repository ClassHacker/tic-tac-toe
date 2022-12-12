import React from 'react';
import Board from './board';
import { GameStatus, ResultModal } from './result';
import calculateWinner from '../util/winner';
import './game.scss';
import { Badge, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { connect } from 'react-redux'
import { rsAction, exAction } from '../redux/actions';

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
      this.exitGame = this.exitGame.bind(this);
      this.newGame = this.newGame.bind(this);
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
  
    newGame(winner){
      const { rs, dispatchRestart} = this.props;
      dispatchRestart();
      console.log(`rs: ${rs}`);
      player2 = new computer.Computer()
      this.setState(
        this.getInitialState()
      );
      this.state.players.map((player) => {
        if (winner === player.name) {
          // this.updatePlayer(player);
          player.gamesWon += 1
        }
        return player;
      });
    }
  
    exitGame(){
      const { ex, dispatchExit} = this.props;
      dispatchExit();
      console.log(`ex: ${ex}`);
      // music.playSound("s1");
      window.location.reload();
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares, this.state.players);
  
      let status;
      let bg = "dark";

      if (winner) {
        bg = "success";
        status = 'Winner : ' + winner;
      } else if(this.state.stepNumber === 9) {
        bg = "success";
        status = "Draw";
      } else {
        status = 'Current Player : ' + (this.state.xIsNext ? this.state.players[0].name : this.state.players[1].name);
      }
  
      return (
        <>
          <ResultModal newGame={this.newGame} exitGame={this.exitGame} bg={bg} winner={winner} players={this.state.players}/>
          <div className='row'>
            <h1>Tic-Tac-Toe</h1>
            <div className='col-lg-3 col-sm-12'>
              <button className='start-button' onClick={() => this.newGame(winner)}>Restart Game</button>
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
            <GameStatus players={this.state.players} />
          </div>
        </>
      );  
  }
}

const mapStateToProps = (state) => ({
  rs: state.rsR,
  ex: state.exR
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRestart: () => dispatch(rsAction()),
  dispatchExit: () => dispatch(exAction())
})

export default connect(mapStateToProps, mapDispatchToProps) (Game);
