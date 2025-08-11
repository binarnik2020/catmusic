const audioPlayer = document.getElementById("audio-player");
const trackTitle = document.getElementById("track-title");
const trackGif = document.getElementById("track-gif");
const seekBar = document.getElementById("seek-bar");

// Здесь просто укажем файлы, названия будут генерироваться сами
const trackFiles = [
  "assets/music/New Year's lullaby.mp3",
  "assets/music/track2.mp3",
  "assets/music/track3.mp3"
];

// Превращаем в массив объектов { title, file }
const tracks = trackFiles.map(filePath => {
  const fileName = filePath.split("/").pop().split(".")[0]; // убираем путь и расширение
  return { title: fileName, file: filePath };
});

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
  audioPlayer.src = tracks[index].file;
  trackTitle.textContent = tracks[index].title;
}

function playTrack() {
  audioPlayer.play().catch(err => console.log(err));
  trackGif.classList.remove("hidden");
  isPlaying = true;
}

function pauseTrack() {
  audioPlayer.pause();
  trackGif.classList.add("hidden");
  isPlaying = false;
}

// Кнопки
document.getElementById("prev-btn").addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

document.getElementById("pause-btn").addEventListener("click", () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

// Зацикливание треков
audioPlayer.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

// Ползунок перемотки
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  seekBar.value = progress || 0;
});

seekBar.addEventListener("input", () => {
  audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

loadTrack(currentTrackIndex);
