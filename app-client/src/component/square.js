import './square.scss';
import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

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
