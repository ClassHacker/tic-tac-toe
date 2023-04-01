import React from 'react';

function Audio () {
  return (
      <>
          <audio id="bg">
              <source src={process.env.PUBLIC_URL + '/music/bg.mp3'} type="audio/mpeg"/>
          </audio>
          <audio id="b1">
              <source src={process.env.PUBLIC_URL + '/music/b1.wav'} type="audio/mpeg"/>
          </audio>
          <audio id="b2">
              <source src={process.env.PUBLIC_URL + '/music/b2.wav'} type="audio/mpeg"/>
          </audio>
          <audio id="c1">
              <source src={process.env.PUBLIC_URL + '/music/c1.mp3'} type="audio/mpeg"/>
          </audio>
          <audio id="c2">
              <source src={process.env.PUBLIC_URL + '/music/c2.mp3'} type="audio/mpeg"/>
          </audio>
          <audio id="w1">
              <source src={process.env.PUBLIC_URL + '/music/w1.mp3'} type="audio/mpeg"/>
          </audio>
      </>
  )
}

export default Audio;
