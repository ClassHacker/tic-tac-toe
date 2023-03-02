export function playSound(sound) {
    let audioPromise = document.getElementById(sound).play();

    if (audioPromise !== undefined) {
        audioPromise.then(() => {
            console.log('playing...');
        }).catch(error => {
            console.log(error);
        });
    } else {
        console.log("undefined");
    }
}