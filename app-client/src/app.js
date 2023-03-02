import React from 'react';
import Home from './component/home';

function App() {
    return (
        <React.StrictMode>
            <Home/>
            <audio id="audio" loop autoPlay> 
                <source src={process.env.PUBLIC_URL + "/bg.mp3"} type="audio/mpeg"/>
            </audio>
        </React.StrictMode>
    )
}

export default App;
