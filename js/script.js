let playNum = 0;
let repeat = false;
let random = false;

let allMusic = [
    {
        artist: 'NDA',
        song: 'Island Party',
        img: './assets/img/f_1.jpg',
        src: './assets/audio/f_1.mp3'
    },
    {
        artist: 'paulb',
        song: 'Deetoy',
        img: './assets/img/f_2.jpg',
        src: './assets/audio/f_2.mp3'
    },
    {
        artist: 'MagnusMoone',
        song: 'Pyre (Alternative Version)',
        img: './assets/img/f_3.jpg',
        src: './assets/audio/f_3.mp3'
    },
    {
        artist: 'GoMordecai',
        song: "Won't Leave You",
        img: './assets/img/f_4.jpg',
        src: './assets/audio/f_4.mp3'
    },
    {
        artist: 'hedkandi',
        song: 'Team Work Celebration',
        img: './assets/img/f_5.jpg',
        src: './assets/audio/f_5.mp3'
    },
    {
        artist: 'NathanBrumley',
        song: 'Color Me Lonely',
        img: './assets/img/f_6.png',
        src: './assets/audio/f_6.mp3'
    },
    {
        artist: 'extendedtone',
        song: 'Overdose',
        img: './assets/img/f_7.jpg',
        src: './assets/audio/f_7.mp3'
    },
    {
        artist: 'Jitter',
        song: 'TheProgram',
        img: './assets/img/f_8.jpg',
        src: './assets/audio/f_8.mp3'
    },
    {
        artist: 'ThePuffballs',
        song: 'Robotic Police Force',
        img: './assets/img/f_9.png',
        src: './assets/audio/f_9.mp3'
    },
    {
        artist: 'Break Me',
        song: 'AllisonGray',
        img: './assets/img/f_10.jpg',
        src: './assets/audio/f_10.mp3'
    },
];

const audioPlayer = document.querySelector(".card");
let audio = new Audio(allMusic[playNum]['src']);
getInfo();

console.dir(audio);

audio.addEventListener( "loadeddata", () => {
    audioPlayer.querySelector(".card__time-left").textContent = getTimeCodeFromNum(audio.duration);
    },
    false
);


const timeline = audioPlayer.querySelector(".card__timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

// //click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeSlider).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// check audio percentage and update time accordingly
setInterval(() => {
    const progress = document.getElementById("progress");
    let val = parseInt(audio.currentTime / audio.duration * 100);
    if (isNaN(val)) {
        return;
      }
    progress.value = val;
    audioPlayer.querySelector(".card__time-passed").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);


const playBtn = audioPlayer.querySelector(".card__btn-play");
playBtn.addEventListener( "click", () => {
    if (audio.paused) {
        // playBtn.classList.remove("_play");
        // playBtn.classList.add("_pause");
        getInfo();
        audio.play();
        audio.onended = repeat ? audio.play : next;
        playBtn.classList.toggle('_pause');
    } else {
        // playBtn.classList.remove("_pause");
        // playBtn.classList.add("_play");
        audio.pause();
        playBtn.classList.toggle('_pause');
    }
    },
    false
);

const playPrev = audioPlayer.querySelector(".card__btn-prev");
const playNext = audioPlayer.querySelector(".card__btn-next");

playPrev.addEventListener( "click", prev, false);
playNext.addEventListener( "click", next, false);

function next() {
    audio.pause();
    playBtn.classList.toggle('_pause', true);
    audio.currentTime = 0;
    if (random == true) {
        let r;
        do {
            r = getRandomNumber(0, allMusic.length - 1)
        }  while (playNum == r);
        playNum = r;
    } else {
        playNum++;
    }

    if (playNum > allMusic.length - 1) playNum = 0;
    audio.src = allMusic[playNum]['src'];
    getInfo();
    audio.play();
}
function prev() {
    audio.pause();
    playBtn.classList.toggle('_pause', true);
    audio.currentTime = 0;
    if (random == true) {
        let r;
        do {
            r = getRandomNumber(0, allMusic.length - 1)
        }  while (playNum == r);
        playNum = r;
    } else {
        playNum--;
    }
    if (playNum < 0) playNum = allMusic.length - 1;
    audio.src = allMusic[playNum]['src'];
    getInfo();
    audio.play();
}

function getInfo() {
    const trackName = audioPlayer.querySelector(".card__title");
    const trackArtist = audioPlayer.querySelector(".card__subtitle");
    const playCover = audioPlayer.querySelector(".card__img");

    trackName.textContent = allMusic[playNum]['song'];
    trackArtist.textContent = allMusic[playNum]['artist'];
    playCover.style.backgroundImage = `url('${allMusic[playNum]['img']}')`;
}


// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
//   const volumeEl = audioPlayer.querySelector(".volume-container .volume");
//   audio.muted = !audio.muted;
//   if (audio.muted) {
//     volumeEl.classList.remove("icono-volumeMedium");
//     volumeEl.classList.add("icono-volumeMute");
//   } else {
//     volumeEl.classList.add("icono-volumeMedium");
//     volumeEl.classList.remove("icono-volumeMute");
//   }
// });


function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function getRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min - 1;
}

const btnRepeat = audioPlayer.querySelector(".card__btn.repeat");
btnRepeat.addEventListener( "click", () => {
    repeat = repeat ? false : true;
    btnRepeat.classList.toggle('_active');
    audio.onended = repeat ? audio.play : next;
}, false);

const btnRandom = audioPlayer.querySelector(".card__btn.random");
btnRandom.addEventListener( "click", () => {
    random = random ? false : true;
    btnRandom.classList.toggle('_active');
}, false);