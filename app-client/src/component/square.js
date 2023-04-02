import './square.scss';

function Square (props) {
  return (
        <button
          key={props.value}
          className="square flip"
          onClick={props.onClick}
        >
          {props.value}
        </button>
  );
}

export default Square;
