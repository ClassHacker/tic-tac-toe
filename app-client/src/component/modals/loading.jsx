import { Modal } from 'react-bootstrap';
import ReactLoading from "react-loading";

export function LoadingModal(props) {
  let socket = props.socket !== undefined;
  return (
    <Modal show={socket}>
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
    </Modal>
  )
}