import { Badge } from 'react-bootstrap';

function Result(props) {
    return (
        <div className='col-lg-3 col-sm-12'>
            <div className="games-won">
            <span className="player0">
                <Badge bg="secondary">{props.players[0].name} : {props.players[0].gamesWon}</Badge>
            </span>
            <span className="player1">
                <Badge bg="secondary">{props.players[1].name} : {props.players[1].gamesWon}</Badge>
            </span>
            </div>
        </div>
    )
}

export default Result;
