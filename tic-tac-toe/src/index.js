import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      isUserNameSet: false,
      showForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange(event) {
    let userName = event.target.value
    this.setState({
      userName: userName
    })
  }

  handleSubmit(event) {
    let userName = this.state.userName;
    let regex = new RegExp(/^[A-Za-z]+[0-9]*$/)
    console.log(regex.test(userName))
    if(regex.test(userName)) {
      this.setState({
        userName: userName,
        isUserNameSet: true,
        showForm: false
      })
    } else {
      alert("Invalid username")
    }
    event.preventDefault();
  }

  startGame() {
    if (this.state.isUserNameSet){
      startGame(this.props.root,this.state.userName);
    } else {
      alert('Please set username first!')
    }
  }

  renderForm() {
    console.log(this.state)
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    return (
      <div className='home-page'>
        <h1>Tic-Tac-Toe</h1>
        <button 
          className='start-button' 
          onClick={this.renderForm}
        >Set Username</button>
        <br/>
        <button 
          className='start-button' 
          onClick={()=>this.startGame()}
        >Start Game</button>

        {this.state.showForm &&
          <form onSubmit={this.handleSubmit}>
                <label className='username'>
                  Enter your user name: 
                  <input 
                    type="text" 
                    value={this.state.value} 
                    onChange={this.handleChange}
                  />
                </label>
                <br></br>
                <input type="submit" value="Save" className='save-button'/>
          </form>
        }
      </div>
    )
  }
}

async function startGame(root, userName) {
  Promise.all([
    // removing the existing players
    await fetch('http://localhost:8080/players/',{
      method: 'DELETE'
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
    await fetch('http://localhost:8080/players/')
  ])
  // handle reponses
  .then(responses=>Promise.all(responses.map(res => res.json())))
  // handle response body
  .then(responses => {
    let players = responses[3].players;
    console.log(players);
    root.render( <Game players = {players}/>);
  })
  .catch((err) => {
    console.log(err)
  });
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
    console.log(props)
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

  // componentDidMount = () => {
  //   this.getPlayers();
  // }

  getPlayers = async () =>  {
    await fetch('http://localhost:8080/players/')
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

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  newGame(winner){
    this.setState(
      this.getInitialState()
    );
    console.log(winner);
    this.state.players.map((player)=> {
      if (winner === player.name) 
        this.updatePlayer(player);
    });
  }

  // endGame(winner){
  //   console.log(winner);
  //   this.state.players.map((player)=> {
  //     if (winner === player.name) 
  //       this.updatePlayer(player);
  //   })
  //   window.location.reload();
  //   this.setState(
  //     this.getInitialState()
  //   )
  //   this.componentDidMount();
  // }

  exitGame(){
    window.location.reload();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.players);
    const moves = history.map((step,move) =>{
      const desc = move ?
        'Go to move #' + move :
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
    }

    return (
      <div className='row'>
        <h1 className='header'>Tic-Tac-Toe</h1>
        <div className='column'>
          <button className='start-button' onClick={() => this.newGame(winner)}>Play Again</button>
          <br/>
          <button className='start-button' onClick={() => this.exitGame()}>Exit Game</button>
          <br/>
        </div>
        <div className="column">
          {/* <Home/> */}
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) =>{this.handleClick(i)}}
            />
          </div>
        </div>
        <div className="column">
          {/* <span>{status}</span> */}
          <div className='games-won'>
            <span>
              {this.state.players[0].name} : {this.state.players[0].gamesWon}
            </span> <br/>
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
root.render(<Home root = {root} />)