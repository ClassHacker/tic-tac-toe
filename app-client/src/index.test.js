// import { render } from '@testing-library/react';
// import App from './app';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import { renderWithProviders } from "./utils/test/test-utils";

const render = jest.fn().mockName('render');
// const render = renderWithProviders();

jest.mock('react');
jest.mock("react-dom/client", () => ({ createRoot: jest.fn().mockName('createRoot') }));
let documentSpy = jest.spyOn(document, 'getElementById')

describe('Application root', () => {
  it("shoudl render without crashing", () =>{
    const div = document.createElement("div");
    div.setAttribute("id", "root");

    ReactDOM.createRoot.mockReturnValue({render});
    require("./index.js");

    expect(ReactDOM.createRoot).toHaveBeenCalledTimes(1);
    expect(documentSpy).toHaveBeenCalledTimes(1);
  })
})


// it('should render without crashing', () => {
//   render(<App root={"root"}/>);
// });
