function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(audio);
    // console.log(key);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
    moveKeyDown(key);
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

function moveKeyDown(key) {
    let margin = parseInt(getComputedStyle(key).marginTop);
    // console.log(margin);
    margin += 10;
    // console.log(margin);
    if (margin > 100) {
        key.style.marginTop = `${defaultMargin}px`;
    }
    else key.style.marginTop = `${margin}px`;
}

const keys = document.querySelectorAll('.key');
const defaultMargin = parseInt(getComputedStyle(keys[0]).marginTop);

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);