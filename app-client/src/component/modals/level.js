import { Button, Modal, Container } from "react-bootstrap";
import './level.scss';

export function Level(props) {
    const { setLevel, show } = props;
    return (
        <Modal
        show={show}
        size={'sm'}
        centered>
            <Modal.Header className="cs-model top-border btm-border">
                <h2>Please select a level</h2>
            </Modal.Header>
            <Modal.Body className="cs-model btm-border">
                <Container className="custom-container">
                    <Button variant="dark" className="btn" onClick={() => setLevel('EASY')}>
                        Easy Level
                    </Button>
                    <Button variant="dark" className="btn" onClick={() => setLevel('MEDIUM')}>
                        Medium Level
                    </Button>
                    <Button variant="dark" className="btn" onClick={() => setLevel('HARD')}>
                        Hard Level
                    </Button>
                    <Button variant="dark" className="btn" onClick={() => setLevel('GOD')}>
                        God Level
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}