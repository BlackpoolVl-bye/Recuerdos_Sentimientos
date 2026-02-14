const songs = [
            {
                title: "Love For You",
                artist: "Loveli Loli & ovg!",
                cover: "/Recursos/Sportify/loveyo.jpg",
                audio: "/Recursos/Musica/love.mp3",
                duration: "4:22"
            },
            {
                title: "Veo en ti la luz",
                artist: "Enredados",
                cover: "/Recursos/Sportify/enredados.jpg",
                audio: "/Recursos/Musica/veo.mp3",
                duration: "3:45"
            },
            {
                title: "Piel Canela",
                artist: "CUCO",
                cover: "/Recursos/Sportify/cuco.jpg",
                audio: "/Recursos/Musica/piel.mp3",
                duration: "2:58"
            },
            {
                title: "Earned It",
                artist: "The Weeknd",
                cover: "/Recursos/Sportify/the.jpg",
                audio: "/Recursos/Musica/the.mp3",
                duration: "4:36"
            },
            {
                title: "Catorce",
                artist: "Sebastian Romero",
                cover: "/Recursos/Sportify/sebas.jpg",
                audio: "/Recursos/Musica/musi.mp3",
                duration: "3:45"
            },
            {
                title: "Te amo y más",
                artist: "Diego Luna",
                cover: "/Recursos/Sportify/te.jpg",
                audio: "/Recursos/Musica/te.mp3",
                duration: "2:36"
            },
            {
                title: "Haruka Mirai",
                artist: "Black Clover",
                cover: "/Recursos/Sportify/blackclover.jpg",
                audio: "/Recursos/Musica/Black.mp3",
                duration: "3:30"
            }
        ];

        const audio = document.getElementById("audio");
        const coverImg = document.getElementById("cover-img");
        const songTitle = document.getElementById("song-title");
        const artist = document.getElementById("artist");
        const progressBar = document.getElementById("progress-bar");
        const currentTimeEl = document.getElementById("current-time");
        const durationEl = document.getElementById("duration");
        const playBtn = document.getElementById("play-btn");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        const playlistEl = document.getElementById("playlist");
        const toastNext = document.getElementById("toast-next");

        let currentSongIndex = 0;
        let isPlaying = false;

        // Inicializar la lista de reproducción
        function initPlaylist() {
            playlistEl.innerHTML = '';
            songs.forEach((song, index) => {
                const songItem = document.createElement('div');
                songItem.className = `song-item${index === currentSongIndex ? ' active' : ''}`;
                songItem.innerHTML = `
                    <img src="${song.cover}" alt="${song.title}">
                    <div class="song-item-info">
                        <h4>${song.title}</h4>
                        <p>${song.artist}</p>
                    </div>
                    <span class="song-duration">${song.duration}</span>
                `;
                songItem.addEventListener('click', () => {
                    currentSongIndex = index;
                    loadSong(songs[currentSongIndex]);
                    playSong();
                    updatePlaylistItems();
                });
                playlistEl.appendChild(songItem);
            });
        }

        // Actualizar los items de la lista de reproducción
        function updatePlaylistItems() {
            const items = playlistEl.querySelectorAll('.song-item');
            items.forEach((item, index) => {
                if (index === currentSongIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Cargar canción
        function loadSong(song) {
            songTitle.textContent = song.title;
            artist.textContent = song.artist;
            coverImg.src = song.cover;
            audio.src = song.audio;
            audio.onloadedmetadata = function() {
                durationEl.textContent = formatTime(audio.duration);
            };
        }

        // Reproducir canción
        function playSong() {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    isPlaying = true;
                    playBtn.textContent = "⏸";
                }).catch(error => {
                    console.log("Audio playback prevented:", error);
                });
            }
        }

        // Pausar canción
        function pauseSong() {
            audio.pause();
            isPlaying = false;
            playBtn.textContent = "▶";
        }

        // Canción anterior
        function prevSong() {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
            }
            loadSong(songs[currentSongIndex]);
            playSong();
            updatePlaylistItems();
            showNextToast("Anterior: " + songs[currentSongIndex].title);
        }

        // Siguiente canción
        function nextSong() {
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
            loadSong(songs[currentSongIndex]);
            playSong();
            updatePlaylistItems();
            showNextToast("Siguiente: " + songs[currentSongIndex].title);
        }

        // Mostrar notificación de siguiente canción
        function showNextToast(text) {
            toastNext.textContent = text;
            toastNext.classList.add("show");
            setTimeout(() => {
                toastNext.classList.remove("show");
            }, 1800);
        }

        // Actualizar barra de progreso
        function updateProgressBar() {
            const { currentTime, duration } = audio;
            progressBar.value = duration ? (currentTime / duration) * 100 : 0;
            currentTimeEl.textContent = formatTime(currentTime);
        }

        // Formatear tiempo (mm:ss)
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Event listeners
        playBtn.addEventListener("click", () => {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });

        prevBtn.addEventListener("click", prevSong);
        nextBtn.addEventListener("click", nextSong);

        progressBar.addEventListener("input", () => {
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = (progressBar.value / 100) * duration;
            }
        });

        audio.addEventListener("timeupdate", updateProgressBar);
        audio.addEventListener("ended", nextSong);

        // Inicializar
        initPlaylist();
        loadSong(songs[currentSongIndex]);
        
        function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    coverImg.src = song.cover;
    audio.src = song.audio;
    playBtn.disabled = true;
    playBtn.innerHTML = '<span class="loader-circle"></span>';
    audio.onloadedmetadata = function() {
        durationEl.textContent = formatTime(audio.duration);
        playBtn.disabled = false;
        playBtn.textContent = isPlaying ? "⏸" : "▶";
    };
}

const style = document.createElement('style');
style.innerHTML = `
.loader-circle {
    border: 3px solid #1db95444;
    border-top: 3px solid #1DB954;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    animation: spin 0.8s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
}
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
`;
document.head.appendChild(style);