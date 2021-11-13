const keys = document.querySelectorAll('.key');
const defaultMargin = parseInt(getComputedStyle(keys[0]).marginTop);

keys.forEach(key => key.addEventListener('transitionend', unPlayKey));
window.addEventListener('keydown', playKey);

function playKey(e) {
    if (e.repeat) return;
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(key);
    if (!key) return;
    key.classList.add('playing');
    playSound(e);
    moveKeyDown(key);
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // console.log(audio);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

function moveKeyDown(key) {
    let margin = parseInt(getComputedStyle(key).marginTop);
    margin += 10;
    if (margin > 100) {
        key.style.marginTop = `${defaultMargin}px`;
    }
    else key.style.marginTop = `${margin}px`;
}

function unPlayKey(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}