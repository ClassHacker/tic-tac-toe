import React from 'react';
import Home from './component/home';

function App() {
    return (
        <React.StrictMode>
            <Home/>
            <audio id="bg"> 
                <source src={process.env.PUBLIC_URL + "/music/bg.mp3"} type="audio/mpeg"/>
            </audio>
            <audio id="b1"> 
                <source src={process.env.PUBLIC_URL + "/music/b1.wav"} type="audio/mpeg"/>
            </audio>
            <audio id="b2"> 
                <source src={process.env.PUBLIC_URL + "/music/b2.wav"} type="audio/mpeg"/>
            </audio>
            <audio id="b3"> 
                <source src={process.env.PUBLIC_URL + "/music/b3.mp3"} type="audio/mpeg"/>
            </audio>
        </React.StrictMode>
    )
}

export default App;
