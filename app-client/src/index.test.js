import { render } from '@testing-library/react';
import App from './app';
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const render = jest.fn().mockName('render')

it('should render without crashing', () => {
  render(<App root={"root"}/>);
});
