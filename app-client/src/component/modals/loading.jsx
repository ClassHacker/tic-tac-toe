import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ReactLoading from 'react-loading';

export function LoadingModal (props) {
  const socket = props.socket !== undefined;
  if (socket) getSecondPlayer();
  async function getSecondPlayer () {
    console.log('finding another player');
    props.socket.emit('find');
    await props.socket.on('found', opponent => {
      console.log('found player:', opponent.username);
      props.fn(opponent.username, true);
    });
  }
  return (
    <Modal show={socket}>
      <ModalBody>
        <span className="status2">Waiting for another player</span>
      </ModalBody>
      <ModalFooter className="custom-container">
        <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
      </ModalFooter>
    </Modal>
  )
}
