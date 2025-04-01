//const's
const audio = document.getElementById('puzzleAudio');
const startButton = document.querySelector(".puzzle__start_button");
const startScreen = document.querySelector(".puzzle__start");
const heatMirage = document.querySelector(".heat-mirage");
const puzzleGrid = document.querySelector(".puzzle__grid");
const puzzleOverlay = document.querySelector(".puzzle__overlay");
const cards = document.querySelectorAll(".card");


//audio starts as we move/hover mouse
document.body.addEventListener('mouseover', () => {
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
});

//lower audio volume
audio.volume = 0.3;

//fade-in and fade-out after start button
document.addEventListener("DOMContentLoaded", () => {

    startButton.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        heatMirage.classList.add("fade-out");

        setTimeout(() => {
            puzzleGrid.classList.add("fade-in");
            puzzleOverlay.classList.add('fade-in');
        }, 1000);
    });
});

// background image and randomizer of same
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".puzzle__start_button");
    const startScreen = document.querySelector(".puzzle__start");
    const heatMirage = document.querySelector(".heat-mirage");
    const puzzleGrid = document.querySelector(".puzzle__grid");
    const puzzleOverlay = document.querySelector(".puzzle__overlay");
    const cards = document.querySelectorAll(".card");

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Background and card images
    const backgroundImages = [
        "background1.jpg", "background2.jpg", "background3.jpg",
        "background4.jpg", "background5.jpg", "background6.jpg",
        "background7.jpg", "background8.jpg", "background9.jpg",
        "background10.jpg"
    ];

    const cardImages = [
        "cactus.jpg", "cactus2.jpg", "camel.jpg", "cowboy.jpg",
        "dry.jpg", "dune.jpg", "man.jpg", "night.jpg",
        "oasis.jpg", "rain.jpg", "scorpion.png", "way.jpg"
    ];

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function assignImages() {
        let images = [...cardImages, ...cardImages];
        images = shuffleArray(images);

        cards.forEach((card, index) => {
            card.dataset.image = images[index];
            card.style.backgroundImage = "";
            card.classList.remove("flipped", "matched", "hidden", "zoom-out");
        });
    }

    // Add event listener for the start button
    startButton.addEventListener("click", () => {
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        puzzleOverlay.style.backgroundImage = `url('./images/puzzle-images/${randomImage}')`;

        startScreen.classList.add("fade-out");
        heatMirage.classList.add("fade-out");

        assignImages();

        setTimeout(() => {
            puzzleGrid.classList.add("fade-in");
            puzzleOverlay.classList.add('fade-in');
        }, 1000);
    });

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

            card.classList.add("flipped");
            card.style.backgroundImage = `url('./images/card-images/${card.dataset.image}')`;
            card.style.backgroundSize = "cover";

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                if (firstCard.dataset.image === secondCard.dataset.image) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");

                    setTimeout(() => {
                        firstCard.classList.add("zoom-out");
                        secondCard.classList.add("zoom-out");
                    }, 300);

                    setTimeout(() => {
                        firstCard.classList.add("hidden");
                        secondCard.classList.add("hidden");
                        resetBoard();
                        checkWinCondition(); // Check if the game is won
                    }, 800);
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");
                        firstCard.style.backgroundImage = "";
                        secondCard.style.backgroundImage = "";
                        resetBoard();
                    }, 700);
                }
            }
        });
    });

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    // Check win condition: when all cards are hidden matched
    function checkWinCondition() {
        if (document.querySelectorAll(".card.hidden").length === cards.length) {
            puzzleOverlay.classList.add("clear-background");
            setTimeout(() => {
                puzzleOverlay.classList.add("show-background");
            }, 1500);
        }
    }
});


