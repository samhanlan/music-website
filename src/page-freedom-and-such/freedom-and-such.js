import './freedom-and-such.scss';
import audioFile from './assets/trailer.mp3';

const audio = document.getElementById('audio-native-player');
const trailerPlayer = document.getElementById('trailer-custom-audio-player');
const transportBtn = trailerPlayer.querySelector('.audio-transport-control');
const progressBar = trailerPlayer.querySelector('.audio-progress');
const trailerArrow = document.querySelector('.section-trailer .arrow');
const trailerLabel = document.querySelector('.trailer-description-wrap');
let onPlaybackElapse;
let willPlay = false;

audio.addEventListener('canplay', () => {
    transportBtn.addEventListener('click', transportHandler);
    trailerArrow.addEventListener('click', transportHandler);
    trailerLabel.addEventListener('click', transportHandler);
})

function transportHandler() {
    willPlay = !willPlay;
        
    if (willPlay) play();
    else pause();
}

function play() {
    audio.play();
        
    onPlaybackElapse = setInterval(() => {
        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }, 750);

    transportBtn.classList.remove('show-play-btn');
    transportBtn.classList.add('show-pause-btn');
}

function pause() {
    onPlaybackElapse = undefined;

    audio.pause();

    transportBtn.classList.remove('show-pause-btn');
    transportBtn.classList.add('show-play-btn');
}
