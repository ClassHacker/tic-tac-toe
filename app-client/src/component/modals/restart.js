import { Badge, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function Restart(props) {
  const { bg, winner, newGame } = props;
  const rsR = useSelector(state => state.rsR)
  return (
    <Modal
      show={rsR}
      dialogClassName="custom-game-modal"
    >
      <ModalBody>
        <span className="status2">Do you really want to restart the game?</span>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button variant="primary" onClick={() => newGame(winner)}>
          Yes
        </Button>
        <Button variant="primary" className="min-w" onClick={() => {}}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  )
}