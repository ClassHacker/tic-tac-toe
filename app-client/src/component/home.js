import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './home.scss';
import Game from './game';
import { Level } from './modals/level';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  setLevel(level) {
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
    // music.playSound("s1");
    let userName = this.state.userName;
    let regex = new RegExp(/^(?=.{3,11}$)(?![0-9])(?!.*[_]{2})[A-Za-z0-9_]+$/)
    console.log('Is it a valid username? ', regex.test(userName))
    if(regex.test(userName) && userName !=="Computer") {
      this.setState({
        userName: userName,
        isUserNameSet: true,
        showForm: false
      })
    } else {
      this.setState({
        isUserNameSet: false,
      })
      alert("Invalid username!!!\n\nConstraints:\n1. Minimum length 3 characters.\n2. Maximum length 11 characters.\n3. No special characters.\n4. Can't start with number.")
    }
    console.log('userName:', userName)
    event.preventDefault();
  }

  initialGame(isSinglePlayer) {
    // music.playSound("s1");
    if (!isSinglePlayer) {
      alert(`Sorry, Multi Player mode isn't available yet 🙂`)
    }
    else if (!this.state.isUserNameSet) {
      alert('Please set username first!')
    }
    else if (!this.state.level.length) {
      alert('Please select the game level!')
    }
    else {
      setTimeout(() => {
        this.startGame2(this.state.userName, isSinglePlayer);
      }, 100);
    }
  }

  renderForm() {
    // music.playSound("s1");
    this.setState({
      showForm: !this.state.showForm
    });
  }

  startGame2(Username, isSinglePlayer) {
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
        <h1>Tic-Tac-Toe</h1>
        <div className='row'>
          <div className='col-md-4 d1'></div>
          <div className='col-md-4 d2'>
            <div className="homepage mr-t-10">
              <button className='home-button zoomIn' 
                onClick={this.renderForm}
              >Set Username</button>
              <button className='home-button zoomIn' 
                onClick={() => this.setState({showLevels: true})}
              >Select Level</button>
              <button className='home-button zoomIn' 
                onClick={()=>this.initialGame(true)}
              >Start Game</button>
              <button className='home-button zoomIn'
                onClick={()=>this.initialGame(false)}
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
        { this.state.isGameOn && <Game players = {this.state.players} isSinglePlayer = {this.state.isSinglePlayer} level = {this.state.level}/> }
      </div>
    )
  }
}

export default Home;