import { Button, Modal, Container } from "react-bootstrap";
import './level.scss';

export function Level(props) {
    const { setLevel, show } = props;
    return (
        <Modal
        show={show}
        size={'sm'}
        className="levelModal"
        centered>
            <Modal.Header className="custom-modal top-border btm-border">
                <h2>Please select a level</h2>
            </Modal.Header>
            <Modal.Body className="custom-modal btm-border">
                <Container className="custom-container">
                    <Button variant="dark" className="level-btn" onClick={() => setLevel('EASY')}>
                        Easy Level
                    </Button>
                    <Button variant="dark" className="level-btn" onClick={() => setLevel('MEDIUM')}>
                        Medium Level
                    </Button>
                    <Button variant="dark" className="level-btn" onClick={() => setLevel('HARD')}>
                        Hard Level
                    </Button>
                    <Button variant="dark" className="level-btn" onClick={() => setLevel('GOD')}>
                        God Level
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}