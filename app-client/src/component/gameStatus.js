import { Badge } from 'react-bootstrap';

export function GameStatus(props) {
    return (
      <>
        <div className="games-won">
          <span className="player0">
            <Badge className='custom-badge'>{props.players[0].name} : {props.players[0].gamesWon}</Badge>
          </span>
          <span className="player1">
            <Badge className='custom-badge'>{props.players[1].name} : {props.players[1].gamesWon}</Badge>
          </span>
        </div>
      </>
    )
  }