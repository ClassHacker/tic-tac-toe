import { Button, Modal, Row, Col, Container } from "react-bootstrap";

export function Level(props) {
    const { setLevel, show } = props;
    return (
        <Modal
        show={show}
        centered
        size={'sm'}>
            <Modal.Header>
                <h2>Please select a level</h2>
            </Modal.Header>
            <Modal.Body >
                <Container>
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
                </Container>
            </Modal.Body>
        </Modal>
    )
}