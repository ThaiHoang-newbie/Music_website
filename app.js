const music = new Audio('audio/   //thêm audio')
// music.play();

const songs = [
    {
        id: 1,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/1"
    },
    {
        id: 2,
        songName: `arjit singh<br>
        <div class="subtitle">arjit singh</div>`,
        poster: "img/2"
    },
    {
        id: 3,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/3"
    },
    {
        id: 4,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/4"
    },
    {
        id: 5,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/5"
    },
    {
        id: 6,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/6"
    },
    {
        id: 7,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/7"
    },
    {
        id: 8,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/8"
    },
    {
        id: 9,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/9"
    },
    {
        id: 10,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/10"
    },
    {
        id: 11,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/11"
    },
    {
        id: 12,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/12"
    },
    {
        id: 13,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/13"
    },
    {
        id: 14,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/14"
    },
    {
        id: 15,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/15"
    },
    {
        id: 16,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/16"
    },
    {
        id: 17,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/17"
    },
    {
        id: 18,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/18"
    },
    {
        id: 19,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/19"
    },
    {
        id: 20,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/20"
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');


masterPlay.addEventListener('click', () => {
    if (music.pause || music.currentTime <= 0) {
        music.play();
        wave.classList.add('activel');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('activel');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.backgroud = 'rgb(105,105,105, .0';
    })
}

let index = 0;
let post_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // consol.log(index);
        music.src = `audio/${index}.mp3`;
        post_master_play.src = `img/${index}.jpg`
        music.play();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');

        let songTitle = songs.filter((els) => {
            return els.id == index;
        });

        songTitle.forEach(elss => {
            let { songName, poster } = elss;
            title.innerHTML = songName;
        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.backgroud = "rgb(105,105,105, .0)"
        makeAllPlays();
        e.target.classList.remove('bi-pause-circle-fill');
        e.target.classList.add('bi-play-circle-fill');
        wave.classList.add('activel');
    });
})

let currentStart = document.getElementById("curentStart");
let currentEnd = document.getElementById("curentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_dur)

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    // console.log(min1)
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1} : ${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentEnd.innerText = `${min2} : ${sec2}`;


    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    // console.log(seek.value);
    let seekBar = seek.value;
    bar2.style.width = `${seekBar} %`;
    dot.style.left = `${seekBar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementById('vol_bar');
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a} %`;
    vol_dot.style.left = `${vol_a} %`;
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    post_master_play.src = `img/${index}.jpg`
    music.play();
    masterPlay.classList.remove('bi-pause-fill');
    masterPlay.classList.add('bi-play-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName, poster } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.backgroud = "rgb(105,105,105, .0)"
    makeAllPlays();
    e.target.classList.remove('bi-pause-circle-fill');
    e.target.classList.add('bi-play-circle-fill');
    wave.classList.add('active1');
})

next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }

    music.src = `audio/${index}.mp3`;
    post_master_play.src = `img/${index}.jpg`
    music.play();
    masterPlay.classList.remove('bi-pause-fill');
    masterPlay.classList.add('bi-play-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName, poster } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.backgroud = "rgb(105,105,105, .0)"
    makeAllPlays();
    e.target.classList.remove('bi-pause-circle-fill');
    e.target.classList.add('bi-play-circle-fill');
    wave.classList.add('active1');
})
let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click', () => {
    pop_song.scrollleft += 330;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollleft -= 330;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Artists_bx = document.getElementsByClassName('item')[0];


pop_art_right.addEventListener('click', () => {
    Artists_bx.scrollleft += 330;
})
pop_art_left.addEventListener('click', () => {
    Artists_bx.scrollleft -= 330;
})
