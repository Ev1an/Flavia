document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTOS DEL DOM ---
    const mainContainer = document.getElementById('main-container');
    const dialogueTextElement = document.getElementById('dialogue-text');
    const dialogueCursor = document.getElementById('dialogue-cursor');
    const audioPlayer = document.getElementById('audio-player');
    const musicControls = document.getElementById('music-controls');
    const playButton = document.getElementById('play-button');
    const playIcon = document.getElementById('play-icon');
    const buttonText = document.getElementById('button-text');
    const musicInfo = document.getElementById('music-info');
    const songTitle = document.getElementById('song-title');
    const progressFill = document.getElementById('progress-fill');
    const lyricsContainer = document.getElementById('lyrics-container');
    const lyricsTextElement = document.getElementById('lyrics-text');
    const finalCard = document.getElementById('final-card');

    // --- NARRATIVA Y DATOS ---
    const dialogueMessages = [
        "Hola guapa",
        "Adivina quien te hizo esta cosa tan hermosa",
        "Si la dulzura tuviera nombre se llamaria Flavia ",
        "Mailov",
        "Esta canción es para ti. Dale play."
    ];

    const lyrics = [
        { time: 2, text: "¿Acaso no te has dado cuenta?" },
        { time: 4, text: "de lo bien que me complementas" },
        { time: 6, text: "si quieres te invito a un helado" },
        { time: 8, text: "y te explico lo chido que haces que me sienta" },
        { time: 9, text: "contigo estoy high sin avión" },
        { time: 11, text: "me haces perder la razón" },
        { time: 13, text: "estoy todo el dia pensandote" },
        { time: 15, text: "con mariposas en el corazón" },
        { time: 17, text: "tú, u, u" },
        { time: 19, text: "me pones todo de cabeza" },
        { time: 21, text: "tú, u, u" },
        { time: 23, text: "eras esa ultima pieza" },
        { time: 24, text: "tú, u, u" },
        { time: 26, text: "eres tan diferente" },
        { time: 28, text: "y no hay nadie que me vuele así la mente" },
        { time: 30, text: "como lo haces tú." }
    ];

    let currentMessageIndex = 0;

    // --- FUNCIONES ---
    function typeWriter(text, onComplete) {
        let i = 0;
        dialogueTextElement.textContent = "";
        dialogueCursor.style.display = 'inline-block';
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                dialogueTextElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(onComplete, 2500);
            }
        }, 70);
    }

    function startDialogue() {
        if (currentMessageIndex < dialogueMessages.length) {
            typeWriter(dialogueMessages[currentMessageIndex], () => {
                currentMessageIndex++;
                startDialogue();
            });
        } else {
            dialogueCursor.style.display = 'none';
            musicControls.classList.add('visible');
        }
    }

    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = `${progressPercent}%`;

            const currentLyric = lyrics.filter(line => currentTime >= line.time).pop()?.text || "";

            if (lyricsTextElement.textContent !== currentLyric) {
                lyricsTextElement.classList.remove('visible');
                setTimeout(() => {
                    lyricsTextElement.textContent = currentLyric;
                    if(currentLyric) lyricsTextElement.classList.add('visible');
                }, 250);
            }
        }
    }

    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.textContent = "⏸";
            buttonText.textContent = "Pausar";
            musicInfo.classList.add('visible');
        } else {
            audioPlayer.pause();
            playIcon.textContent = "▶";
            buttonText.textContent = "Reproducir";
        }
    }

    function showFinalSurprise() {
        lyricsTextElement.classList.remove('visible');
        musicControls.style.opacity = '0';
        
        setTimeout(() => {
            mainContainer.classList.add('dimmed');
            finalCard.classList.add('visible');
        }, 1500);
    }

    // --- INICIALIZACIÓN ---
    const songSrc = audioPlayer.querySelector('source').getAttribute('src');
    songTitle.textContent = songSrc.split('/').pop().replace(/_/g, ' ').split('-')[0].trim();
    
    playButton.addEventListener('click', togglePlay);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', showFinalSurprise);

    startDialogue();
});