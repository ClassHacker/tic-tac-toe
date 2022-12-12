import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { exAction } from '../../redux/actions';

export function ExitModal(props) {
  const { exitGame } = props;
  const exR = useSelector(state => state.exR)
  const dispatch = useDispatch()
  return (
    <Modal
      show={exR}
      dialogClassName="custom-game-modal"
    >
      <ModalBody>
        <span className="status2">Do you really want to exit the game?</span>
      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button variant="primary" className="min-w" onClick={() => {dispatch(exAction());exitGame()}}>
          Yes
        </Button>
        <Button variant="primary" className="min-w" onClick={() => dispatch(exAction())}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  )
}