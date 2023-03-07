import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { rsAction } from '../../redux/actions';
import { playSound } from '../../utils/sound';

export function RestartModal(props) {
  
  function stay() {
    playSound('b2');
    dispatch(rsAction());
  }

  function leave() {
    playSound('b2');
    dispatch(rsAction());
    restartGame(winner);
  }

  const { winner, restartGame } = props;
  const rsR = useSelector(state => state.rsR)
  const dispatch = useDispatch()
  return (
    <Modal
      show={rsR}
      dialogClassName="custom-game-modal"
    >
      <ModalBody>
        <span className="status2">Do you really want to restart the game?</span>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button variant="primary" className="min-w" onClick={() => leave()}>
          Yes
        </Button>
        <Button variant="primary" className="min-w" onClick={() => stay()}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  )
}