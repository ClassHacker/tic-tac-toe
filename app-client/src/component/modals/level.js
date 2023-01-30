import { Button, Modal } from "react-bootstrap";

export function Level(props) {
    const { setLevel, show } = props;
    return (
        <Modal
        show={show}>
            <Modal.Header>
                <h2>Please select a level</h2>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" className="min-w" onClick={() => setLevel('EASY')}>
                Easy Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => setLevel('MEDIUM')}>
                Medium Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => setLevel('HARD')}>
                Hard Level
                </Button>
                <Button variant="primary" className="min-w" onClick={() => setLevel('GOD')}>
                God Level
                </Button>
            </Modal.Body>
        </Modal>
    )
}