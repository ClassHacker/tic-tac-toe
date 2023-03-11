import React from 'react';
import Board from './board';
import { ResultModal } from './modals/result';
import { ScoreCard } from './scoreCard';
import { RestartModal } from './modals/restart';
import { ExitModal } from './modals/exit';
import calculateWinner from '../utils/winner';
import './game.scss';
// import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux'
import { rsAction, exAction } from '../redux/actions';
import { getOpponent } from '../utils/computer/opponent';
import { playSound } from '../utils/sound';

var player2;
var player2Copy;

function initializeSecondPlayer(level) {
  player2 = getOpponent(level);
  player2Copy = player2;
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
      this.exitGame = this.exitGame.bind(this);
      this.restartGame = this.restartGame.bind(this);
      initializeSecondPlayer(props.level);
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
        playSound("c1"); 
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
            setTimeout(() => { 
              this.handleClick(index);
              playSound("c1"); 
            }, 400)
          } else if(this.state.stepNumber <= 6) {
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
  
    restartGame(winner) {
      player2 = getOpponent(this.props.level);
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
      console.log('Game restarted.')
    }

    restart() {
      playSound("b2");
      const { dispatchRestart } = this.props;
      dispatchRestart();
    }
  
    exitGame() {
      window.location.reload();
    }

    exit() {
      playSound("b2");
      const { dispatchExit } = this.props;
      dispatchExit();
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares, this.state.players);

      // let status;
      let bg = "primary";
      if (winner) {
        bg = "success";
        playSound('b1');
        // status = 'Winner : ' + winner;
      } else if(this.state.stepNumber === 9) {
        bg = "success";
        playSound('b1');
        // status = "Draw";
      } else {
        // status = 'Current Player : ' + (this.state.xIsNext ? this.state.players[0].name : this.state.players[1].name);
      }
  
      return (
        <>
          <RestartModal restartGame={this.restartGame} winner={winner} />
          <ExitModal exitGame={this.exitGame} />
          <ResultModal restartGame={this.restartGame} exitGame={this.exitGame} bg={bg} winner={winner} players={this.state.players}/>
          <div className='row'>
            <h1 className='pulse'>Tic-Tac-Toe</h1>
            <h2 className="level">Level : {this.props.level}</h2>
            <div className='col-lg-3 col-sm-12 neumorphism-div'>
              <div className='buttons'>
                <button className='game-button' onClick={() => this.restart()}>Restart Game</button>
                <button className='game-button' onClick={() => this.exit()}>Exit Game</button>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 neumorphism-div">
              <div className="game-board">
                {/* <span className="status"><Badge bg={bg} pill>{status}</Badge></span> */}
                <Board 
                  squares={current.squares}
                  onClick={(i)=>{this.makeMove(i)}}
                />
              </div>
            </div>
            <div className='col-lg-3 col-sm-12 neumorphism-div'>
              {/* <div className="neumorphism-div"> */}
                <ScoreCard players={this.state.players} />
              {/* </div> */}
            </div>
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