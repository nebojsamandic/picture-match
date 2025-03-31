const audio = document.getElementById('puzzleAudio');

document.body.addEventListener('mouseover', () => {
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
});

audio.volume = 0.3;

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".puzzle__start_button");
    const startScreen = document.querySelector(".puzzle__start");
    const heatMirage = document.querySelector(".heat-mirage");
    const puzzleGrid = document.querySelector(".puzzle__grid");

    startButton.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        heatMirage.classList.add("fade-out");

        setTimeout(() => {
            puzzleGrid.classList.add("fade-in");  
        }, 1000);
    });
});
