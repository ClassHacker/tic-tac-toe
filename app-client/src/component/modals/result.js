import { Badge, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';

export function GameStatus(props) {
  return (
    <>
      <div className="games-won">
        <span className="player0">
          <Badge bg="info">{props.players[0].name} : {props.players[0].gamesWon}</Badge>
        </span>
        <span className="player1">
          <Badge bg="info">{props.players[1].name} : {props.players[1].gamesWon}</Badge>
        </span>
      </div>
    </>
  )
}

export function ResultModal(props) {
  const { bg, winner, players, restartGame, exitGame } = props;
  return (
    <Modal
      show={bg === "success"}
      dialogClassName="custom-game-modal"
    >
      <ModalBody>
        <span className="status2">
          {(winner === "Computer") && <>You have lost the match</>}
          {(winner === players[0].name) && <>You have won the match</>}
          {(winner === null) && <>Match Tied</>}
        </span>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button variant="primary" className="min-w" onClick={() => restartGame(winner)}>
          Play Again
        </Button>
        <Button variant="primary" className="min-w" onClick={exitGame}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
  )
}