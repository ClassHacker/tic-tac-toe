import './square.scss';

function Square(props) {
    return (
        <button
          className="square zoomIn" 
          onClick={props.onClick}
        >
          {props.value}
        </button>
    );
}

export default Square;
