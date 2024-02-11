let currentMusic = 0;

let songList = [
    {
        img:"image/faded.jpg",
        path:"songs/faded.mp3",
        name:"Faded",
        artist:"artist 1"
    },
    {
        img:"image/hymn for the weekend.jpeg",
        path:"songs/hymn for the weekend.mp3",
        name:"hymn for the weekend",
        artist:"artist 2"
    },
    {
        img:"image/jane sar hai.jpeg",
        path:"songs/jane sar hai.mp3",
        name:"jane sar hai",
        artist:"artist 3"
    },
    {
        img:"image/lehara do.jpeg",
        path:"songs/lehara do.mp3",
        name:"lehara do",
        artist:"artist 4"
    },
    {
        img:"image/kuch to bata zindagi.jpeg",
        path:"songs/kuch to bata zindagi.mp3",
        name:"kuch to bata zindagi",
        artist:"artist 5"
    }
];


const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentmusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('#play-btn');
const playBtnDiv = document.querySelector('.click');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtnDiv.addEventListener('click',()=>{
    if(playBtn.className.includes('fa-play')){
        music.play();
    }else{
        music.pause();
    }
    playBtn.classList.toggle('fa-play');
    playBtn.classList.toggle('fa-pause');
    disk.classList.toggle('play');

    /*  if(playBtn.classList.contains('fa-play')){
            music.play();
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
            disk.classList.toggle('play');
        }else{
            music.pause();
            playBtn.classList.add('fa-play');
            playBtn.classList.remove('fa-pause');
            disk.classList.toggle('play');
        }
    */
})

const setMusic = (i) => {
    seekBar.value=0;
    let song = songList[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.img}')`;

    currentmusicTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300)
}
setMusic(0);

setInterval(()=>{
    seekBar.value = music.currentTime;
    currentmusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(seekBar.value) == Math.floor(seekBar.max)){
        forwardBtn.click();
    }
},500);

seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value;
    music.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    disk.classList.add('play');
})

const formatTime = (time) => {
    let min = Math.floor(time/60);
    if(min<10){
        min = `0${min}`;
    }
    let sec = Math.floor(time%60);
    if(sec<10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}


forwardBtn.addEventListener('click',()=>{
    if(currentMusic >= songList.length-1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

backwardBtn.addEventListener('click',()=>{
    if(currentMusic <= 0){
        currentMusic = songList.length-1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})

const playMusic = () =>{
    music.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    disk.classList.add('play');
}

