import backGround from "../static/bg.mp3";
import button1 from "../static/b1.wav";
import button2 from "../static/b2.wav";
 
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
    let audio = new Audio(audioName);
    audio.play();
}