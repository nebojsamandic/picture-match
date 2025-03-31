const audio = document.getElementById('puzzleAudio');

document.body.addEventListener('mouseover', () => {
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
});

audio.volume = 0.3;