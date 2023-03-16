import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './home.scss';
import Game from './game';
import { Level } from './modals/level';
import { playSound } from '../utils/sound';
import { io } from 'socket.io-client';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      isUserNameSet: false,
      showForm: false,
      players: [],
      isSinglePlayer: undefined,
      isGameOn: false,
      level: "",
      showLevels: false,
      socket: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  setLevel(level) {
    playSound('b2');
    this.setState({
      level: level,
      showLevels: false
    });
  }

  handleChange(event) {
    let userName = event.target.value.replace(/[^a-z0-9]/gi, '');
    this.setState({
      userName: userName
    })
  }

  handleSubmit(event) {
    let userName = this.state.userName;
    let regex = new RegExp(/^(?=.{3,11}$)(?![0-9])(?!.*[_]{2})[A-Za-z0-9_]+$/)
    console.log('Is it a valid username? ', regex.test(userName))
    if(regex.test(userName) && userName !=="Computer") {
      playSound("b2");
      this.setState({
        userName: userName,
        isUserNameSet: true,
        showForm: false
      })
    } else {
      this.setState({
        isUserNameSet: false,
      })
      playSound('b1');
      setTimeout(() => {
        alert("Invalid username!!!\n\nConstraints:\n1. Minimum length 3 characters.\n2. Maximum length 11 characters.\n3. No special characters.\n4. Can't start with number.")
        playSound("b2");}, 100);
    }
    console.log('userName:', userName)
    event.preventDefault();
  }

  initialGame(isSinglePlayer) {
    if (!isSinglePlayer) {
      playSound("b1");
      setTimeout(() => {
        const socket = io("http://localhost:8080");
        this.setState({socket : socket});
        this.startGame(this.state.userName, isSinglePlayer);
        // alert(`Sorry, Multi Player mode isn't available yet 🙂`);
        // playSound("b2");
      }, 100);
    }
    else if (!this.state.isUserNameSet) {
      playSound("b1");
      setTimeout(() => {
        alert('Please set username first!');
        playSound("b2");
      }, 100);
    }
    else if (!this.state.level.length) {
      playSound("b1");
      setTimeout(() => {
        alert('Please select the game level!');
        playSound("b2");
      }, 100);
    }
    else {
      playSound("b2");
      setTimeout(() => {
        this.startGame(this.state.userName, isSinglePlayer);
      }, 100);
    }
  }

  renderForm() {
    playSound("b2");
    this.setState({
      showForm: !this.state.showForm
    });
  }

  startGame(Username, isSinglePlayer) {
    const userName = isSinglePlayer? 'Computer' : "XYZ";
    this.setState({
      players: [
        {name: Username, gamesWon: 0},
        {name: userName, gamesWon: 0}
      ],
      isSinglePlayer: isSinglePlayer,
      isGameOn: true
    })
  }
  
  render() {
    const handleClose = () => {
      this.setState({
        showForm: false
      })
    }
    return (
      <div id='main'>
        { !this.state.isGameOn && 
        <>
        <h1 className='pulse'>Tic-Tac-Toe</h1>
        <div className='row'>
          <div className='col-md-4 d1'></div>
          <div className='col-md-4 d2'>
            <div className="homepage mr-t-10">
              <button className='home-button bounceInDown' 
                onClick={this.renderForm}
              >Set Username</button>
              <button className='home-button bounceInDown' 
                onClick={() => {playSound('b2'); this.setState({showLevels: true})}}
              >Select Level</button>
              <button className='home-button bounceInDown' 
                onClick={()=> {this.initialGame(true)}}
              >Start Game</button>
              <button className='home-button bounceInDown'
                onClick={()=> {this.initialGame(false)}}
              >Multi Player</button>
              <Modal 
                show={this.state.showForm} 
                onHide={handleClose} 
                size="sm"
                dialogClassName="custom-modal"
              >
                <Modal.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId={this.state.value} >
                      <Form.Label className="custom-label">Enter your user name</Form.Label>
                      <Form.Control className="custom-input" type="text" value={this.state.userName} onChange={this.handleChange} autoFocus autoComplete="false"/>
                    </Form.Group>
                    {/* {false && <>
                      <label>Minimum length 3 characters</label>
                      <label>Maximum length 11 characters</label>
                      <label>No special characters</label>
                      <label>Can't start with number</label>
                    </>} */}
                    <br/>
                    <Button variant="primary" type="submit" >
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
              <Level setLevel = {this.setLevel} show={this.state.showLevels}/>
            </div>
          </div>
          <div className='col-md-4 d3'></div>
        </div>
        </> }
        { this.state.isGameOn && <Game players = {this.state.players} isSinglePlayer = {this.state.isSinglePlayer} level = {this.state.level} socket = {this.state.socket} /> }
      </div>
    )
  }
}

export default Home;