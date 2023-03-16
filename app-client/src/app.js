import React from 'react';
import Home from './component/home';
import Audio from './component/audio';
import { io } from 'socket.io-client'

function App() {
    const socket = io("http://localhost:8080")
    console.log('socket', socket);
    return (
        <React.StrictMode>
            <Home/>
            <Audio/>
        </React.StrictMode>
    )
}

export default App;