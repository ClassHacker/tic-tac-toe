import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { playSound } from '../../utils/sound';

export function ResultModal (props) {
  function restart () {
    playSound('b2');
    restartGame(winner);
  }

  function exit () {
    playSound('b2');
    exitGame();
  }

  const { bg, winner, players, restartGame, exitGame } = props;
  return (
    <Modal
      show={bg === 'success'}
      dialogClassName="custom-game-modal"
    >
      <ModalBody>
        <span className="status2">
          {(winner === 'Computer') && <>You have lost the match</>}
          {(winner === players[0].name) && <>You have won the match</>}
          {(winner === null) && <>Match Tied</>}
        </span>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button variant="primary" className="min-w" onClick={restart}>
          Play Again
        </Button>
        <Button variant="primary" className="min-w" onClick={exit}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
  )
}
