import backGround from "../common/bg.mp3";
import button1 from "../common/b1.wav";
import button2 from "../common/b2.wav";
 
export function playSound(sound) {
    let audioName = "";
    switch(sound) {
        case "b1":
            audioName = button1;
            break;
        case "b2":
            audioName = button2;
            break;
        case 'bg':
            audioName = backGround;
            break;
        default:
            audioName = '';
    }
    // var promise = 
    document.getElementById(sound).play();

// if (promise !== undefined) {
//   promise.then(_ => {
//     // Autoplay started!
//   }).catch(error => {
//     // Autoplay was prevented.
//     // Show a "Play" button so that user can start playback.
//   });
// }
    // let audio = new Audio(audioName);
    // audio.play();
}