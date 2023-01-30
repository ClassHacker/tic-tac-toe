import { Button, Modal } from "react-bootstrap";

export function Level(props) {
    function doNothing() {
        return 0;
    }
    return (
        <Modal
        show={true}>
            <Modal.Body>
                <Button variant="primary" className="min-w" onClick={() => doNothing()}>
                Easy Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => doNothing()}>
                Medium Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => doNothing()}>
                Hard Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => doNothing()}>
                God Level
                </Button>
            </Modal.Body>
        </Modal>
    )
}